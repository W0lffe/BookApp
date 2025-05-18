import { createContext, useReducer, useRef, useState } from "react";
import { fetchData, postData} from "../http";
import { sort, filter} from "../components/Sort/sorting";
import { getPageCount } from "../components/util";

export const BookContext = createContext({
    mode: null,
    books: [],
    count: null,
    dates: [],
    setMode: () => {},
    isFetchingData: false,
    fetchAndSetBooks: () => {},
    modal: undefined,
    sortBooks: () => {},
    filterBooks: () => {},
    pageCount: null,
    isInitialized: false,
    updateBookState: () => {},
})

const bookReducer = (state, action) => {
    console.log(action.type, action.payload)
    switch(action.type){
        case "SET_MODE":
            return{
                ...state, mode: action.payload
            }
        case "SET_BOOKS": 
            if(state.isInitialized){
                return{
                    ...state, books: action.payload
                }
            }

            return{
                ...state, 
                    books: action.payload,
                    count: action.payload.length,
                    pageCount: getPageCount(action.payload),
                    isInitialized: true
            }
    }
}

export default function BookContextProvider({children}){
    const [isFetchingData, setIsFetchingData] = useState(false);
    const modal = useRef();
    const fullList = useRef();

    const [bookState, dispatch] = useReducer(bookReducer, {
        mode: null,
        books: [],
        count: null,
        pageCount: null,
        isInitialized: false,
    })

    const setMode = (mode) => {
        dispatch({
            type: "SET_MODE",
            payload: mode
        })
    }

    const updateBookState = async (update, use) => {

        let updatedBooks = [];
        switch(use){
            case "edit": 
            updatedBooks = [...bookState.books].map((book) => 
                            book.id === update.id ? update : book);
            break;
            case "add": 
            updatedBooks = [...bookState.books, update];
            break;
            case "del":
            updatedBooks = [...bookState.books].filter((book) => book.id !== update);
            break;
        }
        bookState.isInitialized = false;

        await postAndFetch(updatedBooks);
    }

    const postAndFetch = async(data) => {

        await postData(data)
        await fetchAndSetBooks();
    }
    
    const fetchAndSetBooks = async() => {
        setIsFetchingData(true);

        const fetch = async() => {

            const books = await fetchData();
            dispatch({
                type: "SET_BOOKS",
                payload: books
            })
            fullList.current = books;
            setIsFetchingData(false);
        }
        fetch();
    }

    const sortBooks = (sortBy) => {

        const sortedBooks = sort({
            fullList: bookState.books,
            key: sortBy
        })

        dispatch({
            type: "SET_BOOKS",
            payload: sortedBooks
        })
    }

    const filterBooks = (value) => {
        let filteredBooks;

        if(value.length === 0){
            filteredBooks = fullList.current;
        }
        else{
            filteredBooks = filter({
                fullList: bookState.books,
                key: value
            })
        }

        dispatch({
            type: "SET_BOOKS",
            payload: filteredBooks
        })
    }

    const contextValue = {
        state: bookState,
        setMode,
        isFetchingData,
        fetchAndSetBooks,
        modal,
        sortBooks,
        filterBooks,
        updateBookState
    }

    return(
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    )
}