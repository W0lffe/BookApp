import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBook, faPen, faFile } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { BookContext } from "../../context/BooksContext";

export default function Sort(){

    const {sortBooks, filterBooks} = useContext(BookContext)

    return(
        <div className="sort-container">
            <input type="text" placeholder="Search by title or author" onChange={(e) => {filterBooks(e.target.value)}} />
            <section id="sort-bar">
                <FontAwesomeIcon icon={faBook} onClick={() => {sortBooks("title")}} />
                <FontAwesomeIcon icon={faPen} onClick={() => {sortBooks("author")}}/>
                <FontAwesomeIcon icon={faFile} onClick={() => {sortBooks("pages")}}/>
                <FontAwesomeIcon icon={faStar} onClick={() => {sortBooks("stars")}}/>
            </section>
        </div>
    )
}