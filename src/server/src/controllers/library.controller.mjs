import { Sum, getBookById, getRecommendations, createReservation } from '../services/library.services.mjs';

const calculateSum = (req, res) =>{
  const { num1, num2 } = req.body;
  const result = Sum(num1, num2);
  res.json({ result });
}

const getBookDetails = (req, res) => {
  const { id } = req.params;
  const book = getBookById(id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
};

const getBookRecommendations = (req, res) => {
  const { id } = req.params;
  const recommendations = getRecommendations(id);
  res.json(recommendations);
};

const reserveBook = (req, res) => {
  const { userId, bookId } = req.body;
  const result = createReservation(userId, bookId);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(201).json(result.reservation);
};

export { calculateSum, getBookDetails, getBookRecommendations, reserveBook };