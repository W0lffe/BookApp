import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { BookContext } from "../../context/BooksContext"

export default function ListItem({item}){

    const {setMode} = useContext(BookContext)

    return(
        <span>
            <li>
                <FontAwesomeIcon icon={faPenToSquare} onClick={() => setMode({book: item, mode: "edit"})} />
                <label>Title</label>
                <label>Author</label>
                <label>Pages</label>
                <label>Rating</label>
                <label>Read</label>
            </li>
            <li>
                <label>{item.title}</label>
                <label>{item.author}</label>
                <label>{item.pages ? item.pages : "pagecount"}</label>
                <label>{item.rating ? item.rating : "stars"}</label>
                <label>{item.date}</label>
            </li>
        </span>
    )
}