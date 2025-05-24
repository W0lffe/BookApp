import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { BookContext } from "../../context/BooksContext"

export default function ListItem({item, number}){

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
        <span className="flex flex-row w-9/10 h-fit gap-5 border mt-2 rounded-bl-[16px] rounded-tr-[16px]">
            <li className="flex flex-col h-fit p-3 gap-1">
                <FontAwesomeIcon icon={faPenToSquare} 
                                onClick={() => setMode({book: item, mode: "edit"})} 
                                className="text-[18px]"/>
                <label>Title</label>
                <label>Author</label>
                <label>Pages</label>
                <label>Read</label>
                <label>Rating</label>
            </li>
            <li className="flex flex-col h-fit gap-1 p-3 border-l-1 border-l-white/20">
                <label className="text-[18px]">{`#${number}`}</label>
                <label>{item.title}</label>
                <label>{item.author}</label>
                <label>{item.pages}</label>
              
                <label>{item.date}</label>
                 <span className="flex flex-row gap-1">
                    {countStars()}
                </span>
            </li>
        </span>
    )
}