import { createContext, useReducer, useState } from "react";
import { fetchData } from "../http";

export const BookContext = createContext({
    modalOn: false,
    books: [],
    count: null,
    setMode: () => {},
    isFetchingData: false,
    fetchAndSetBooks: () => {},

})

const bookReducer = (state, action) => {
    console.log(action.type, action.payload)
    switch(action.type){
        case "SET_MODAL":
            return{
                ...state, modalOn: action.payload
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
        modalOn: "",
        books: [],
        count: null
    })

    const setMode = (mode) => {
        dispatch({
            type: "SET_MODAL",
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