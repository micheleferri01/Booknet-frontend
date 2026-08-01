import axios  from "axios";
import { useEffect, useState } from "react";
import SearchSelect from "../components/SearchSelect";
import BooksCard from "../components/BooksCard";
import { useSearchParams } from "react-router";

export default function BooksHomePage (){
    // useStates
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [books, setBooks] = useState();
    const [search, setSearch] = useState("");
    const [author, setAuthor] = useState(null);
    const [editor, setEditor] = useState(null);
    const [genre, setGenre] = useState(null);

    const [searchParams, setSearchParams]=useSearchParams();

   

    useEffect( ()=>{
        const controller = new AbortController();

        setLoading(true);

        axios.get(import.meta.env.VITE_BASE_API_URL + '/books', {
            signal: controller.signal,
            params:{
                search: searchParams.get("search") || undefined,
                author: searchParams.get("author") || undefined,
                editor: searchParams.get("editor") || undefined,
                genre: searchParams.get("genre") || undefined,
            }
        })
             .then((res)=>{
                console.log(res.data);
                setBooks(res.data.data);
            })
            .catch((err)=>{
                if (err.name !== 'CanceledError') {
                    console.error(err);
                    setError(err);
                }
            })
            .finally(()=>{
                setLoading(false);
            });
            return ()=>{controller.abort();};
        },[searchParams]);

        console.log('libri',books);

        
    return (
        <>
        <h1 className="text-center py-3">Trova il Libro che stai cercando</h1>
        <form action="" className="container" onSubmit={
            (e) => {
                e.preventDefault();
                const params = {};

                if (search) {
                    params.search = search;
                }

                if (author) {
                    params.author = author;
                }

                if (editor) {
                    params.editor = editor;
                }

                if (genre) {
                    params.genre = genre;
                }

                setSearchParams(params);

        }}>
            <div className="d-flex flex-column flex-lg-row gap-3">
                <div className="input-group w-100">
                    <input type="text" className="form-control" placeholder="Cerca un libro" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button type="submit" className="btn btn-outline-secondary rounded-end-pill">Cerca</button>
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

        {loading? <h1 className="text-center my-3">Caricamento...</h1> : books === undefined ?
            <h1 className="text-center my-3">Nessun risultato trovato</h1>:
            <section id="books"className="container mt-5">
                <p className="mb-3">Risultati trovati ({books.length})</p>
                <div className="row g-3 gap-3">
                    {books.map(book => {
                        return (
                        <BooksCard key={book.slug} book={book}/>
                    )
                    })}
                </div>
            </section>
        }

        </>
    )
}