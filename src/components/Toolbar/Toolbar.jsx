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

    const bookCount = !isFetchingData ? <h3 className="text-[18px]">{`This year I have read ${count} ${books}.`}</h3> :
                                        <h3>Retrieving data...</h3>

    const pageCount = !isFetchingData ? <p className="text-[16px]">{`This totals in ${pages} pages.`}</p> :
                                        <h3>Retrieving data...</h3>

    const title = !isFetchingData ? <p className="text-[16px] italic">{`Your title is ${state.title}.`}</p> :
                                        null
    return(
        <div className="flex flex-col w-full h-fit gap-2 px-5 lg:items-center font-medium">
            {bookCount}
            {pageCount}
            {title}
            <section className="flex flex-col w-full items-center justify-center gap-2">
                <button onClick={handleAdd}
                        className="w-40 p-2 border-1 border-black rounded-bl-[12px] rounded-tr-[12px] hover:p-3 bg-gray-700/50 hover:bg-gray-400/50 hover:animate-pulse transition-all">
                ADD BOOK</button>
                <Sort />
            </section>
        </div>
    )
}