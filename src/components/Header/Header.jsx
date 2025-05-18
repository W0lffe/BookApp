import { useEffect, useContext } from "react"
import { BookContext } from "../../context/BooksContext"

export default function Header(){

    const {fetchAndSetBooks} = useContext(BookContext)

    useEffect(() => {
        fetchAndSetBooks();
    }, [])


    return(
        <header id="header">
            <h2>My Virtual Bookshelf</h2>
        </header>
    )
}