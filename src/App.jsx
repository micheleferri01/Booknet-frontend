import { BrowserRouter, Routes, Route } from 'react-router';
import DefaultLayout from './layouts/DefaultLayout';
import BooksHomePage from './pages/BooksHomePage';
import { BooksProvider } from './contexts/BooksContext';


export default function App() {

  return (
    <>
    <BooksProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path='/' Component={BooksHomePage}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </BooksProvider>
    </>
  )
}
