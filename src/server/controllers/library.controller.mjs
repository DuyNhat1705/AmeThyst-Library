import { Sum, getSurfingBooks, getBookDetails } from '../services/library.services.mjs';

const calculateSum = (req, res) => {
  const { num1, num2 } = req.body;
  const result = Sum(num1, num2);
  res.json({ result });
};

const getSurfingPage = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;
    const books = await getSurfingBooks(limit, skip);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookDeepDive = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await getBookDetails(id);
    if (!details) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { calculateSum, getSurfingPage, getBookDeepDive };
