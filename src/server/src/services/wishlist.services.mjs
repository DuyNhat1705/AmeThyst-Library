import * as wishlistModel from '../models/wishlist.models.mjs';
import { syncWishlistAdd, syncWishlistRemove } from './memgraphSync.services.mjs';

/**
 * Adds a book to user's wishlist and syncs to Memgraph in the background.
 * @param {string} userId - UUID of the user
 * @param {string} bookId - ID of the book
 * @returns {Promise<object>} Created wishlist item details
 */
export const addToWishlist = async (userId, bookId) => {
  const result = await wishlistModel.addWishlist(userId, bookId);
  
  // Non-blocking background sync
  syncWishlistAdd(userId, bookId).catch(err => 
    console.error('Error dispatching Memgraph sync add:', err)
  );

  return result;
};

/**
 * Removes a book from user's wishlist and syncs to Memgraph in the background.
 * @param {string} userId - UUID of the user
 * @param {string} bookId - ID of the book
 * @returns {Promise<boolean>} True if removed successfully
 */
export const removeFromWishlist = async (userId, bookId) => {
  const isWishlisted = await wishlistModel.checkWishlistStatus(userId, bookId);
  if (!isWishlisted) {
    throw new Error('Book is not in the user\'s wishlist');
  }

  const success = await wishlistModel.removeWishlist(userId, bookId);
  if (success) {
    // Non-blocking background sync
    syncWishlistRemove(userId, bookId).catch(err => 
      console.error('Error dispatching Memgraph sync remove:', err)
    );
  }

  return success;
};

/**
 * Retrieves a user's wishlist.
 * @param {string} userId - UUID of the user
 * @returns {Promise<Array>} List of wishlist items
 */
export const getUserWishlist = async (userId) => {
  return await wishlistModel.getWishlistByUserId(userId);
};

/**
 * Checks if a book is in the user's wishlist.
 * @param {string} userId - UUID of the user
 * @param {string} bookId - ID of the book
 * @returns {Promise<boolean>} Wishlist status
 */
export const checkWishlistStatus = async (userId, bookId) => {
  return await wishlistModel.checkWishlistStatus(userId, bookId);
};
