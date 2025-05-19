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
        listContent = list.map((item, i) => <ListItem key={i} item={item}/>)
    }
    
    return(
        <ul>
            {listContent}
        </ul>
    )
}

