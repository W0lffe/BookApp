import { useEffect, useContext } from "react"
import { BookContext } from "../../context/BooksContext"

export default function Header(){

    const {fetchAndSetBooks} = useContext(BookContext)

    useEffect(() => {
        fetchAndSetBooks();
    }, [])


    return(
        <header className="flex flex-row w-full p-1 px-5 lg:p-5 bg-gradient-to-tr from-gray-700/50 to-gray-500/80  rounded-b-2xl">
            <h2 className="text-2xl lg:text-3xl italic font-medium">My Virtual Bookshelf</h2>
        </header>
    )
}