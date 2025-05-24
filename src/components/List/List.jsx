import { useContext, useEffect, useState } from "react"
import { BookContext } from "../../context/BooksContext";
import ListItem from "./ListItem";

export default function List(){

    const {state} = useContext(BookContext)
    const [list, setList] = useState([]);

    useEffect(()=>{
        setList(state.books)
    },[state.books]) 

    let listContent = <h3>No books found.</h3>;

    if(list.length > 0){
        listContent = list.map((item, i) => <ListItem key={i} item={item} number={i+1}/>)
    }
    
    return(
        <ul className="flex flex-col w-9/10 max-h-120 overflow-y-auto border items-center
                    border-black/50 p-1 mt-5 lg:m-5 bg-gradient-to-tr from-gray-700/50 to-gray-600/80 rounded-[10px] ">
            {listContent}
        </ul>
    )
}

