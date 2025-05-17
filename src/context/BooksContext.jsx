import { createContext, useReducer, useRef, useState } from "react";
import { fetchData, postData} from "../http";

export const BookContext = createContext({
    mode: null,
    books: [],
    count: null,
    dates: [],
    setMode: () => {},
    isFetchingData: false,
    fetchAndSetBooks: () => {},
    modal: undefined,
    addBook: () => {},
    editBook: () => {}
})

const bookReducer = (state, action) => {
    console.log(action.type, action.payload)
    let updatedBooks;
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
        case "ADD_BOOK":
            updatedBooks = [...state.books, action.payload]
            return{
                ...state, books: updatedBooks
            }
        case "MODIFY_BOOK":
            updatedBooks = [...state.books].map((book) => 
                    book.id === action.payload.id ? action.payload : book)
            return {
                ...state, books: updatedBooks
            }
        
    }
}

export default function BookContextProvider({children}){
    const [isFetchingData, setIsFetchingData] = useState(false);
    const modal = useRef();
    const [bookState, dispatch] = useReducer(bookReducer, {
        mode: null,
        books: [],
        count: null,
    })

    const setMode = (mode) => {
        dispatch({
            type: "SET_MODE",
            payload: mode
        })
    }

    const addBook = (newBook) => {
        dispatch({
            type: "ADD_BOOK",
            payload: newBook
        })
    }
    
    const editBook = (editedBook) => {
        dispatch({
            type: "MODIFY_BOOK",
            payload: editedBook
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
        fetchAndSetBooks,
        modal,
        addBook,
        editBook 
    }

    return(
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    )
}