"use client";
import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('opac'); // 'opac' or 'semantic'
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setBooks([]);
    try {
      const res = await fetch(`http://localhost:5000/api/books/search?q=${encodeURIComponent(query)}&mode=${mode}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        console.error("Unexpected search response:", data);
        setBooks([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (book) => {
    setSelectedBook(book);
    setDetails(null);
    setDetailsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/books/${book.id}/details`);
      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
    setDetails(null);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <NavBar />
      
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder={mode === 'opac' ? "Search by title, author, or ISBN..." : "Describe a vibe, theme, or plot..."} 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
            className="search-mode-select"
          >
            <option value="opac">Standard Search</option>
            <option value="semantic">AI Semantic Search</option>
          </select>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="masonry-container">
        {books.map((book, index) => (
          <div key={`${book.id}-${index}`} className="masonry-item" onClick={() => handleBookClick(book)}>
            <img src={book.coverUrl} alt={book.title} />
          </div>
        ))}
      </div>

      {loading && <p style={{ textAlign: 'center', marginTop: '2rem' }}>Searching...</p>}
      {!loading && query && books.length === 0 && <p style={{ textAlign: 'center', marginTop: '2rem' }}>No books found for "{query}".</p>}

      {selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <div className="modal-body">
              <div className="modal-left">
                <img src={selectedBook.coverUrl} alt={selectedBook.title} />
              </div>
              <div className="modal-right">
                <h2 style={{ color: 'black' }}>{selectedBook.title}</h2>
                {detailsLoading ? (
                  <p style={{ color: '#666' }}>Loading deep dive data...</p>
                ) : details ? (
                  <div style={{ color: 'black' }}>
                    <p><strong>Authors:</strong> {details.authors?.join(', ') || 'Unknown'}</p>
                    <p><strong>Genres:</strong> {details.genres?.join(', ') || 'None'}</p>
                    <hr />
                    <h3>Description (ChromaDB)</h3>
                    <p>{details.vectorData?.description || 'No description available in vector store.'}</p>
                    <hr />
                    <h3>Graph Context (Memgraph)</h3>
                    <p>Book ID: {selectedBook.id}</p>
                    <p>ISBN: {selectedBook.isbn13 || selectedBook.isbn || 'N/A'}</p>
                  </div>
                ) : (
                  <p style={{ color: 'red' }}>Could not load additional details.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .search-container {
          display: flex;
          justify-content: center;
          padding: 2rem;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }
        .search-form {
          display: flex;
          gap: 1rem;
          width: 100%;
          max-width: 800px;
        }
        .search-input {
          flex: 1;
          padding: 0.8rem 1.2rem;
          border: 1px solid #444;
          border-radius: 4px;
          font-size: 1rem;
          color: white;
          background: #333;
        }
        .search-input::placeholder {
          color: #888;
        }
        .search-mode-select {
          padding: 0.8rem;
          border: 1px solid #444;
          border-radius: 4px;
          background: #333;
          color: white;
          cursor: pointer;
        }
        .search-button {
          padding: 0.8rem 1.5rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .search-button:hover {
          background: #0051bb;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          color: black;
        }
        .modal-body {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .modal-left {
          flex: 1;
          min-width: 250px;
        }
        .modal-left img {
          width: 100%;
          border-radius: 4px;
        }
        .modal-right {
          flex: 2;
          min-width: 300px;
        }
        hr { margin: 1.5rem 0; border: 0; border-top: 1px solid #eee; }
        h3 { margin-top: 1rem; color: #333; font-weight: bold; }
      `}</style>
    </main>
  );
}
