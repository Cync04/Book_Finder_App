import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Book_Finder() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const navigate = useNavigate()

    const searchBooks = async () => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();
        setBooks(data.items || []);
    };

    return (
        <>
            <div>
                <h1>Book Finder</h1>
                <p>Search for books by title here:</p>
            </div>
            <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for books...' />
            <button onClick={searchBooks}>Search</button>
            
            <div>
                {books.map((book) => {
                    const info = book.volumeInfo;
                    return (
                        <div key={book.id}>
                            <h2>{info.title}</h2>
                            <p>{info.authors?.join(", ")}</p>
                            {info.imageLinks?.thumbnail && (
                                <img 
                                src={info.imageLinks.thumbnail} 
                                alt={info.title}
                                onClick ={() => navigate(`/book/${book.id}`)}
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
