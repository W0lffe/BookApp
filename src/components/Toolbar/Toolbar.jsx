import { useContext } from "react";
import { BookContext } from "../../context/BooksContext";

export default function Toolbar(){

    const {state, setMode, isFetchingData} = useContext(BookContext)

    const handleClick = () => {
        setMode(true)
    }

    const count = state.count;
    const books = count > 1 ? "books" : "book" ; 

    const heading = !isFetchingData ?   <h3>{`This year I have read ${count} ${books}`}</h3> :
                                        <h3>Retrieving data...</h3>

    return(
        <div>
            {heading}
            <section>
                <button onClick={handleClick}>ADD BOOK</button>
            </section>
        </div>
    )
}