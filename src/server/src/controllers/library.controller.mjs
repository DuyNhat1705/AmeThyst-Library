import { Sum, getBookById, getRecommendations, createReservation, getBooksList } from '../services/library.services.mjs';

const calculateSum = (req, res) =>{
  const { num1, num2 } = req.body;
  const result = Sum(num1, num2);
  res.json({ result });
}

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const result = await getBooksList(page, limit);
    res.json(result);
  } catch (error) {
    console.error('Error fetching books from database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBookRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const recommendations = await getRecommendations(id);
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const reserveBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const result = await createReservation(userId, bookId);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res.status(201).json(result.reservation);
  } catch (error) {
    console.error('Error reserving book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { calculateSum, getAllBooks, getBookDetails, getBookRecommendations, reserveBook };