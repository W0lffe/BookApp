import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, 
        faStar, 
        faStarHalf } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { BookContext } from "../../context/BooksContext"

export default function ListItem({item, number}){

    const {setMode} = useContext(BookContext);
    const [open, setOpen] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const countStars = () => {

        const fullStars = Math.floor(item.stars);
        const hasHalfStar = item.stars % 1 !== 0;

        let content = [];

        for(let i = 0; i < fullStars; i++){
            content.push(<FontAwesomeIcon icon={faStar} key={i} className="text-amber-400"/>)
        }
        
        if(hasHalfStar){
            content.push(<FontAwesomeIcon icon={faStarHalf} key={hasHalfStar} className="text-amber-400"/>)
        }

        return content;
    }

    const handleClick = () => {
        setOpen(prevState => !prevState)
    }

    return(
        <div className={`w-[90%] max-h-fit m-2 border rounded-bl-[16px] 
                        rounded-tr-[16px] hover:p-2 hover:bg-gray-800/80 transition-all
                        ${isTouched ? "p-2 bg-gray-800/80" : ""} `}
                        onTouchStart={() => setIsTouched(true)}
                        onTouchEnd={() => setIsTouched(false)}
                        onClick={handleClick}>

            <div className={`flex flex-row gap-5 overflow-hidden transition-all 
                            duration-750 ease-out
                            ${open ? "max-h-[250px] p-2 bg-gray-800/80 rounded-bl-[16px] rounded-tr-[16px] " : "max-h-[80px] hover:max-h-[110px] "}
                            ${isTouched ? "max-h-[110px]" : ""}`}>
                <ItemLeftContainer func={setMode} />              
                <ItemRightContainer item={item} number={number} func={countStars}/>
            </div>
        </div>
    )
}

function ItemLeftContainer({func}){

    const labels = ["Title", "Author", "Pages", "Read", "Rating"]

    return(
        <li className="flex flex-col p-3 gap-2 items-center">
                <FontAwesomeIcon icon={faPenToSquare} 
                                onClick={() => func({book: item, mode: "edit"})} 
                                className="text-[18px] m-1"/>
                {labels.map((label) => <label key={label}>{label}</label> )}
            </li>
    )
}

function ItemRightContainer({item, number, func}){

    return(
        <li className="flex flex-col gap-2 p-3 border-l-1 border-l-white/20">
                <label className="text-[18px]">{`#${number}`}</label>
                <label>{item.title}</label>
                <label>{item.author}</label>
                <label>{item.pages}</label>
                <label>{item.date}</label>
                 <span className="flex flex-row gap-1">
                    {func()}
                </span>
            </li>
    )
}

