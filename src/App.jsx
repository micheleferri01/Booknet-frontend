import { BrowserRouter, Routes, Route } from 'react-router';
import DefaultLayout from './layouts/DefaultLayout';
import BooksHomePage from './pages/BooksHomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import { CartProvider } from './contexts/CartContext';
import { NotificationContextProvider } from './contexts/NotificationContext';
import Cart from './pages/Cart';


export default function App() {

  return (
    <>
    <NotificationContextProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path='/' Component={BooksHomePage}/>
              <Route path='/:slug' Component={BookDetailsPage}/>
              <Route path='/cart' Component={Cart}/>
            </Route>

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </NotificationContextProvider>
    </>
  )
}
