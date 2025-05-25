import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBook, faPen, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { BookContext } from "../../context/BooksContext";

export default function Sort(){

    const {sortBooks, filterBooks} = useContext(BookContext)

    const iconStyle = "text-[24px] p-1";

    return(
        <div className="flex flex-col w-fit border-1 border-black bg-gray-700/40 rounded-bl-[12px] rounded-tr-[12px]">
            <input type="text" 
            placeholder="Search by title or author" 
            onChange={(e) => {filterBooks(e.target.value)}} 
            className="border border-gray-800/60 w-60 p-2 rounded-tr-[12px] hover:bg-gray-400/50 hover:animate-pulse hover:p-3 transition-all"/>
            <section className="flex flex-row w-full gap-10 justify-center">
                <FontAwesomeIcon icon={faBook} 
                                 onClick={() => {sortBooks("title")}} 
                                 className={iconStyle}/>
                <FontAwesomeIcon icon={faPen} 
                                onClick={() => {sortBooks("author")}}
                                className={iconStyle}/>
                <FontAwesomeIcon icon={faCalendarDays} 
                                onClick={() => {sortBooks("date")}}
                                className={iconStyle}/>
                <FontAwesomeIcon icon={faStar} 
                                onClick={() => {sortBooks("stars")}}
                                className={iconStyle}
                />
            </section>
        </div>
    )
}