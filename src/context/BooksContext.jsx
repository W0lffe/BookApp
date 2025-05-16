import { createContext, useReducer, useState } from "react";
import { fetchData, postData} from "../http";

export const BookContext = createContext({
    mode: "",
    books: [],
    count: null,
    dates: [],
    setMode: () => {},
    isFetchingData: false,
    fetchAndSetBooks: () => {},
})

const bookReducer = (state, action) => {
    console.log(action.type, action.payload)
    switch(action.type){
        case "SET_MODE":
            return{
                ...state, mode: action.payload
            }
        case "SET_BOOKS": 
            return{
                ...state, 
                    books: action.payload,
                    count: action.payload.length
            }
        
    }
}

export default function BookContextProvider({children}){
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [bookState, dispatch] = useReducer(bookReducer, {
        mode: "",
        books: [],
        count: null,
    })

    const setMode = (mode) => {
        dispatch({
            type: "SET_MODE",
            payload: mode
        })
    }
    
    const fetchAndSetBooks = async() => {
        setIsFetchingData(true);

        const fetch = async() => {

            const books = await fetchData();
            dispatch({
                type: "SET_BOOKS",
                payload: books
            })
            setIsFetchingData(false)
        }
        fetch();
    }

    const contextValue = {
        state: bookState,
        setMode,
        isFetchingData,
        fetchAndSetBooks
    }

    return(
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    )
}