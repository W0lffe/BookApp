import { createContext, useReducer, useRef, useState } from "react";
import { fetchData, postData} from "../http";
import { sort, filter} from "../components/Sort/sorting";
import { getPageCount, getTitle } from "../components/util";
import toast from "react-hot-toast";

export const BookContext = createContext({
    mode: null,
    books: [],
    count: null,
    dates: [],
    title: "",
    setMode: () => {},
    isFetchingData: false,
    fetchAndSetBooks: () => {},
    modal: undefined,
    sortBooks: () => {},
    filterBooks: () => {},
    pageCount: null,
    isInitialized: false,
    updateBookState: () => {},
    fullList: [],
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

        const count = action.payload.length;
            return{
                ...state, 
                    books: action.payload,
                    count,
                    pageCount: getPageCount(action.payload),
                    title: getTitle(count),
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
        title: ""
    })

    const setMode = (mode) => {
        dispatch({
            type: "SET_MODE",
            payload: mode
        })
    }

    const updateBookState = async (update, use) => {

        let updatedBooks;

        try {
            switch(use){
            case "edit": 
            updatedBooks = [...fullList.current].map((book) => 
                            book.id === update.id ? update : book);
            break;
            case "add": 
            updatedBooks = [...fullList.current, update];
            break;
            case "del":
            updatedBooks = [...fullList.current].filter((book) => book.id !== update);
            break;
        }
            bookState.isInitialized = false;
            
            const response = await postAndFetch(updatedBooks);
            return {success: response.success, error: response.error || ""}

        } catch (error) {
            console.error("Failed to update book state: " , error);
            return {success: false,  error}
        }
      
    }

    const postAndFetch = async(data) => {
        
        const response = await postData(data);
        if(response.success){
            await fetchAndSetBooks();
        }

        return response;
    }
    
    const fetchAndSetBooks = async() => {
        setIsFetchingData(true);

        const fetch = async() => {

            const response = await fetchData();
            const books = response.books;

            if(!response.success){
                toast.error(`Something went wrong... ${response.error}`, {duration: 2000})
            }
          
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
        updateBookState,
        fullList: fullList.current
    }

    return(
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    )
}