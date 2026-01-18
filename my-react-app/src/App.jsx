import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Book_Finder from './Book_Finder.jsx'
import Book_Details from './Book_Details.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Book_Finder />} />
        <Route path="/book/:id" element={<Book_Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
