import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './Book_Finder.css'

function Book_Finder() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const searchBooks = useCallback(async () => {
        setLoading(true);
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();
        setBooks(data.items || []);
        setLoading(false);
    }, [query]);

    //pressing 'enter' key will also trigger search
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && query.trim() !== '') {
                searchBooks();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [query, searchBooks]);


    // Fetch random books to display on initial load
    useEffect(() => {
        const fetchRandomBooks = async () => {
            const randomLetters = 'abcdefghijklmnopqrstuvwxyz';
            const randomChar = randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
            setLoading(true);
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${randomChar}&maxResults=20`);
            const data = await response.json();
            //create a onclick attribute for each book image to navigate to book details page
            const booksWithNavigate = data.items?.map(book => ({
                ...book,
                onClick: () => navigate(`/book/${book.id}`)
            })) || [];
            setBooks(booksWithNavigate);
            setLoading(false);
        };
        fetchRandomBooks();
    }, [navigate]);

    // if filter selected, automatically search for that genre

    return (
        <>
            <div>
                <h1>Book Finder</h1>
                <p>Search for books by title here:</p>
            </div>
            <input
                className = 'search-bar'
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for books...' />
                {query.trim() !== '' && <button onClick={searchBooks}>Search</button>}
                
                <div className="filter-buttons">
                    <label>Quick Filters:</label>
                        <select id="filter-select" onChange={(e) => setQuery(e.target.value)}>
                            <option value="">Select Genre</option>
                            <option value="fiction">Fiction</option>
                            <option value="non-fiction">Non-Fiction</option>
                            <option value="science">Science</option>
                            <option value="history">History</option>
                            <option value="biography">Biography</option>
                        </select>
                </div>

            <div className = "book-grid">
                {books.map((book) => {
                    const info = book.volumeInfo;
                    return (
                        <div 
                        className = "book-card" 
                        key={book.id}
                        onClick ={() => navigate(`/book/${book.id}`)}
                        >
                            <h2>{info.title}</h2>
                            <p>{info.authors?.join(", ")}</p>
                            {info.imageLinks?.thumbnail && (
                                <img 
                                src={info.imageLinks.thumbnail} 
                                alt={info.title}
                                style = {{cursor: 'pointer'}} 
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Book_Finder;
