import { useEffect, useContext } from "react"
import { BookContext } from "../../context/BooksContext"

export default function Header(){

    const {fetchAndSetBooks} = useContext(BookContext)

    useEffect(() => {
        fetchAndSetBooks();
    }, [])


    return(
        <header className="sticky top-0 flex flex-row w-full p-1 px-5 lg:p-5 bg-gradient-to-tr from-gray-800/60 to-gray-600/80  rounded-b-2xl">
            <h2 className="text-2xl lg:text-3xl italic font-medium">My Library</h2>
        </header>
    )
}