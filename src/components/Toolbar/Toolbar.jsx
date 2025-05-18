import { useContext } from "react";
import { BookContext } from "../../context/BooksContext";
import Sort from "../Sort/Sort";

export default function Toolbar(){

    const {state, setMode, isFetchingData} = useContext(BookContext)

    const handleAdd = () => {
        setMode({mode: "add"});
    }

    const count = state.count;
    const books = count > 1 ? "books" : "book" ; 
    const pages = state.pageCount;

    const bookCount = !isFetchingData ? <h3>{`This year I have read ${count} ${books}`}</h3> :
                                        <h3>Retrieving data...</h3>

    const pageCount = !isFetchingData ? <p>{`This totals in ${pages} pages.`}</p> :
                                        <h3>Retrieving data...</h3>

    return(
        <div>
            {bookCount}
            {pageCount}
            <section>
                <button onClick={handleAdd}>ADD BOOK</button>
            </section>
            <Sort />
        </div>
    )
}