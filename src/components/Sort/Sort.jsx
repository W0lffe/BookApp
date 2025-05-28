import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBook, faPen, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState} from "react";
import { BookContext } from "../../context/BooksContext";

export default function Sort(){

    const {sortBooks, filterBooks} = useContext(BookContext)
    const [isTouched, setIsTouched] = useState(false);
    

    const iconStyle = "text-[24px] p-1 m-2";

    return(
        <div className="flex flex-col w-fit border-1 border-black bg-gradient-to-tr from-gray-800/60 to-gray-600/80 rounded-bl-[12px] rounded-tr-[12px]">
            <input type="text" 
            placeholder="Search by title or author" 
            onChange={(e) => {filterBooks(e.target.value)}} 
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            className={`border border-gray-800/60 w-full p-2 rounded-tr-[12px]
             hover:bg-gray-400/50 hover:animate-pulse hover:p-3 transition-all text-center
             ${isTouched ? "p-2 bg-gray-800/80" : ""}`}/>
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