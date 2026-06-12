import { 
  Sum, 
  getSurfingBooks, 
  getBookDetails, 
  searchBooksOpac, 
  searchBooksSemantic, 
  enrichSearchResults,
  getAllGenres
} from '../services/library.services.mjs';

const calculateSum = (req, res) => {
  const { num1, num2 } = req.body;
  const result = Sum(num1, num2);
  res.json({ result });
};

const getSurfingPage = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;
    const { genre } = req.query;
    const books = await getSurfingBooks(limit, skip, genre);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGenres = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.json(genres);
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

const searchBooks = async (req, res) => {
  try {
    const { q, mode } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    const limit = parseInt(req.query.limit) || 20;
    
    let bookIds = [];
    if (mode === 'semantic') {
      bookIds = await searchBooksSemantic(q, limit);
    } else {
      bookIds = await searchBooksOpac(q, limit);
    }
    
    const books = await enrichSearchResults(bookIds);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { calculateSum, getSurfingPage, getBookDeepDive, searchBooks, getGenres };
