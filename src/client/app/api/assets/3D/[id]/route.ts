import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'app/assets/MapImages/3D', `room_${id}.png`);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('API 3D Asset retrieve error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
