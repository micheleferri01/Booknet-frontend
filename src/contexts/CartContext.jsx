import { createContext, useContext, useState, useEffect } from "react";
import { useNotificationContext } from "./NotificationContext";

const CartContext = createContext();

function CartProvider({ children }) {
  const { showNotification } = useNotificationContext();

  const [cart, setCart] = useState(() => {
    // recupera i dati dal local storage all'avvio
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // aggiorna il local storage quando il carrello cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // aggiunge un prodotto al carrello
  const addToCart = (book) => {
    showNotification(`"${book.title}" Aggiunto al carrello!`, "success");
    setCart((oldCart) => {
      const existing = oldCart.find((item) => item.id === book.id);

      if (existing) {
        return oldCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }

      return [...oldCart, { id: book.id, quantity: 1 }];
    });
  };

  // Rimuove un elemento dal carrello
  const removeFromCart = (bookId, bookTitle) => {
    setCart(
      (oldCart) =>
        oldCart
          .map((book) =>
            book.id === bookId
              ? { ...book, quantity: (book.quantity || 1) - 1 }
              : book,
          )
          .filter((book) => book.quantity > 0),
      showNotification(
        `"${bookTitle}" Diminuita quantità nel carrello!`,
        "danger",
      ),
    );
  };

  //* Calcolo totale pezzi nel carrello
  const totalQuantity = cart.reduce((acc, book) => {
    return acc + (book.quantity || 1);
  }, 0);

  function clearCart() {
    setCart([]);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    totalQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCart };
