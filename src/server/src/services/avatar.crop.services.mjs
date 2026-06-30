import pool from '../config/postgres.mjs';
import sharp from 'sharp';
import { uploadToCloudinary } from './user.services.mjs';

const CROP_DISPLAY_SIZE = 280;
const CROP_OUTPUT_SIZE = 512;

// B2a: Validate coordinates and zoom range
export const validateCropInput = (zoom, offsetX, offsetY) => {
  const z = parseFloat(zoom);
  const x = parseFloat(offsetX);
  const y = parseFloat(offsetY);

  if (isNaN(z) || z < 1.0 || z > 5.0) {
    throw new Error('Validation failed: Zoom must be between 1.0 and 5.0');
  }
  if (isNaN(x) || !isFinite(x) || isNaN(y) || !isFinite(y)) {
    throw new Error('Validation failed: Offset coordinates must be finite numbers');
  }

  return { zoom: z, offsetX: x, offsetY: y };
};

// B2b: Get image buffer from file or remote URL (checking content-type header)
export const getImageBuffer = async (file, imageUrl) => {
  if (file && file.buffer) {
    return file.buffer;
  }

  if (imageUrl) {
    let url;
    try {
      url = new URL(imageUrl);
    } catch (e) {
      throw new Error('Invalid URL format');
    }

    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('The URL does not point to a valid image resource');
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  throw new Error('No avatar file or URL provided');
};

// B2c: Calculate the crop rectangle coordinates on the original image
export const computeCropRect = async (buffer, zoom, offsetX, offsetY) => {
  const metadata = await sharp(buffer).metadata();
  const imgWidth = metadata.width;
  const imgHeight = metadata.height;

  if (!imgWidth || !imgHeight) {
    throw new Error('Unable to read image dimensions');
  }

  const baseScale = Math.max(CROP_DISPLAY_SIZE / imgWidth, CROP_DISPLAY_SIZE / imgHeight);
  const scale = baseScale * zoom;

  const cropX_scaled = (CROP_DISPLAY_SIZE - imgWidth * scale) / 2 + offsetX;
  const cropY_scaled = (CROP_DISPLAY_SIZE - imgHeight * scale) / 2 + offsetY;

  const left = -cropX_scaled / scale;
  const top = -cropY_scaled / scale;
  const cropW = CROP_DISPLAY_SIZE / scale;
  const cropH = CROP_DISPLAY_SIZE / scale;

  return { left, top, width: cropW, height: cropH, imgWidth, imgHeight };
};

// B2d: Crop image using Sharp (extending canvas if needed), resize to 512, upload to Cloudinary and update postgres db
export const cropAndUpload = async (userId, buffer, cropRect) => {
  const { left, top, width, height, imgWidth, imgHeight } = cropRect;

  // Calculate required padding on each edge if crop bounds extend outside original image
  const padLeft = left < 0 ? Math.ceil(-left) : 0;
  const padRight = (left + width) > imgWidth ? Math.ceil((left + width) - imgWidth) : 0;
  const padTop = top < 0 ? Math.ceil(-top) : 0;
  const padBottom = (top + height) > imgHeight ? Math.ceil((top + height) - imgHeight) : 0;

  let sharpImg = sharp(buffer);
  if (padLeft > 0 || padRight > 0 || padTop > 0 || padBottom > 0) {
    sharpImg = sharpImg.extend({
      top: padTop,
      bottom: padBottom,
      left: padLeft,
      right: padRight,
      background: { r: 0, g: 0, b: 0, alpha: 0 } // transparent background
    });
  }

  const newWidth = imgWidth + padLeft + padRight;
  const newHeight = imgHeight + padTop + padBottom;

  const newLeft = left + padLeft;
  const newTop = top + padTop;

  // Clamping and rounding values to safe integer parameters
  const finalWidth = Math.round(width);
  const finalHeight = Math.round(height);
  const finalLeft = Math.max(0, Math.min(newWidth - finalWidth, Math.round(newLeft)));
  const finalTop = Math.max(0, Math.min(newHeight - finalHeight, Math.round(newTop)));

  const croppedBuffer = await sharpImg
    .extract({
      left: finalLeft,
      top: finalTop,
      width: finalWidth,
      height: finalHeight
    })
    .resize(CROP_OUTPUT_SIZE, CROP_OUTPUT_SIZE)
    .toBuffer();

  const secureUrl = await uploadToCloudinary(croppedBuffer);

  const result = await pool.query(
    `UPDATE users 
     SET avatar = $1 
     WHERE user_id = $2 
     RETURNING user_id, email, username, phone_number, avatar, role`,
    [secureUrl, userId]
  );

  const updatedUser = result.rows[0];
  if (!updatedUser) {
    throw new Error('User not found or failed to update avatar');
  }

  return secureUrl;
};

// B2e: Export orchestrating avatarCropService
export const avatarCropService = async (userId, file, imageUrl, zoom, offsetX, offsetY) => {
  const validated = validateCropInput(zoom, offsetX, offsetY);
  const buffer = await getImageBuffer(file, imageUrl);
  const cropRect = await computeCropRect(buffer, validated.zoom, validated.offsetX, validated.offsetY);
  const secureUrl = await cropAndUpload(userId, buffer, cropRect);
  return secureUrl;
};
