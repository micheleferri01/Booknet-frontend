import axios  from "axios";
import { useEffect, useState } from "react";
import SearchSelect from "../components/SearchSelect";
import { useBooksContext } from "../contexts/BooksContext";
import BooksCard from "../components/BooksCard";

export default function BooksHomePage (){
    // useStates
    const [author, setAuthor] = useState();
    const [editor, setEditor] = useState();
    const [genre, setGenre] = useState();

    // custom hook
    const {booksSetter, books} = useBooksContext();

    useEffect( ()=>{
        const controller = new AbortController();
        axios.get(import.meta.env.VITE_BASE_API_URL + '/books', {signal: controller.signal})
             .then((res)=>{
                console.log(res.data);
                booksSetter(res.data.data);
            })
            .catch((err)=>{
                if (err.name !== 'CanceledError') {
                    console.error(err);
                }
            });
            return ()=>{controller.abort();};
        },[]);
        console.log('libri',books);
    return (
        <>
        <h1 className="text-center py-3">Trova il Libro che stai cercando</h1>
        <form action="" className="container">
            <div className="d-flex flex-column flex-lg-row gap-3">
                <div className="w-100">
                    <input type="text" className="form-control" placeholder="Cerca un libro"/>
                </div>
                <div className="d-flex gap-3 py-3 py-lg-0 flex-column flex-md-row align-items-center justify-content-center">
                    <div className="select-w">
                    <SearchSelect url='/authors' placeholder='Autori' value={author} onChange={setAuthor}/>
                    </div>
                    <div className="select-w">
                    <SearchSelect url='/editors' placeholder='Editori' value={editor} onChange={setEditor}/>
                    </div>
                    <div className="select-w">
                    <SearchSelect url='/genres' placeholder='Generi' value={genre} onChange={setGenre}/>
                    </div>
                </div>
            </div>
        </form>

       <section id="books"className="container mt-5">
        <div className="row g-3 gap-3">
            {books.map(book => {
                return (<>
                <BooksCard key={book.slug} book={book}/>
                </>)
            })}
        </div>
       </section>
        </>
    )
}