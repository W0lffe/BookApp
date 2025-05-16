import { useContext, useEffect, useState } from "react"
import { BookContext } from "../../context/BooksContext";
import ListItem from "./ListItem";

export default function List(){

    const {state} = useContext(BookContext)
    const [list, setList] = useState([]);

    useEffect(()=>{
        console.log(state.books)
        setList(state.books)
    },[state.books]) 

    let listContent = <h3>Shelf is empty, add books first</h3>;

    if(list.length > 0){
        listContent = list.map((item, i) => <ListItem key={i} item={item}/>)
    }
    
    return(
        <ul>
            {listContent}
        </ul>
    )
}

