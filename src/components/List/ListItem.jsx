import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { BookContext } from "../../context/BooksContext"

export default function ListItem({item}){

    const {setMode} = useContext(BookContext);

    const countStars = () => {

        const fullStars = Math.floor(item.stars);
        const hasHalfStar = item.stars % 1 !== 0;

        let content = [];

        for(let i = 0; i < fullStars; i++){
            content.push(<FontAwesomeIcon icon={faStar} key={i} />)
        }
        
        if(hasHalfStar){
            content.push(<FontAwesomeIcon icon={faStarHalf} key={hasHalfStar} />)
        }

        return content;
    }



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
                <label>{item.pages}</label>
                {countStars()}
                <label>{item.date}</label>
            </li>
        </span>
    )
}