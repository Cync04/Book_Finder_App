import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

function Book_Details(){
    const { id } = useParams();
    const [book, setBook] = useState(null)
     useEffect(() => {
    async function fetchBook() {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      const data = await res.json();
      setBook(data);
    }
    fetchBook();
  }, [id]);

    if (!book) {
    return <div>Loading...</div>;
  }
    const info = book.volumeInfo;
    // Remove HTML tags from the description
    const clean = info.description?.replace(/<[^>]*>/g, "");
    return (
        <div style = {{padding: '20px'}}>
            <h1>{info.title}</h1>
            <h3>by {info.authors?.join(", ")}</h3>
            {info.imageLinks?.thumbnail && (
                <img 
                src={info.imageLinks.thumbnail} 
                alt={info.title}
                style = {{width: '200px', height: 'auto'}} 
                />
            )}
            <p>{clean}</p>
            <p><strong>Published Date:</strong> {info.publishedDate}</p>
            <p><strong>Publisher:</strong> {info.publisher}</p>
            <p><strong>Page Count:</strong> {info.pageCount}</p>
            <p><strong>Categories:</strong> {info.categories?.join(", ")}</p>
            <a href={info.previewLink} target="_blank" rel="noopener noreferrer">Preview Book</a>
        </div>
    );
}
export default Book_Details;