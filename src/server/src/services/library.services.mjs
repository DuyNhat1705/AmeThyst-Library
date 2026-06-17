import { BOOKS, INVENTORY, RESERVATIONS } from '../models/library.models.mjs';

export function Sum(num1,num2)
{
    return num1 + num2;
}

export const getBookById = (id) => {
  const book = BOOKS.find(b => b.id === id);
  if (!book) return null;
  
  const inventory = INVENTORY.find(i => i.bookId === id);
  return { ...book, inventory };
};

export const getRecommendations = (id) => {
  const book = BOOKS.find(b => b.id === id);
  if (!book) return [];
  
  return BOOKS.filter(b => b.id !== id && b.category === book.category).slice(0, 5);
};

export const createReservation = (userId, bookId) => {
  const inventory = INVENTORY.find(i => i.bookId === bookId);
  if (!inventory || inventory.availableCopies <= 0) {
    return { error: 'Book currently unavailable for reservation' };
  }

  inventory.availableCopies -= 1;
  const reservation = {
    id: `res_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    bookId,
    status: 'confirmed',
    createdAt: new Date(),
    pickupDeadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  };
  
  RESERVATIONS.push(reservation);
  return { reservation };
};