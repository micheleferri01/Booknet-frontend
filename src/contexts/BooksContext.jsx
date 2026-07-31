import {createContext, useContext, useState} from "react";

const BooksContext = createContext();

function BooksProvider ({children}) {
    const [books, setBooks] = useState([]);

    const booksSetter = (array)=>{setBooks(array)};

    const dataValue = {booksSetter, books};

    return <BooksContext.Provider value={dataValue}>{children}</BooksContext.Provider>
}

function useBooksContext () {
    return useContext(BooksContext);
};

export {BooksProvider, useBooksContext}