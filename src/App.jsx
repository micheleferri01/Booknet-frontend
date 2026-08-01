import { BrowserRouter, Routes, Route } from 'react-router';
import DefaultLayout from './layouts/DefaultLayout';
import BooksHomePage from './pages/BooksHomePage';


export default function App() {

  return (
    <>
   
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path='/' Component={BooksHomePage}/>
        </Route>

      </Routes>
    </BrowserRouter>

    </>
  )
}
