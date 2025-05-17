import { useContext, useState } from "react"
import { BookContext } from "../../context/BooksContext"
import { validateIsString, validateIsNumber } from "./validate";
import { getDate } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";

export default function NewBook(){

    const {state, addBook, setMode, editBook, deleteBook} = useContext(BookContext)

    const bookToEdit = state.mode.book ? state.mode.book : null;
    const id = bookToEdit ? bookToEdit.id : state.books.length + 1;
    const date = bookToEdit ? bookToEdit.date : getDate();
    const isEditing = state.mode.mode === "edit";

    let initialState = {
        errors: null,
         validInputs: {
            title: "",
            author: "",
            pages: 0,
    }}
    let initialValue = 1;


    if(isEditing){
        const {title, author, pages, stars} = bookToEdit;
        initialState = {
            errors: null,
             validInputs: {
                title,
                author,
                pages: pages || 0
        }}

        initialValue = stars || 1;

    }

    const [sliderValue, setSliderValue] = useState(initialValue);
    const [formState, setFormState] = useState(initialState)
    const heading = state.mode.mode === "add" ? "New Book" : "Edit Book"

    const newBook = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        const title = formData.get("title")
        const author = formData.get("author")
        const pages = parseInt(formData.get("pages"))
        const stars = parseFloat((formData.get("stars")))

        let errors = [];

        if(!validateIsString(title)){
            errors.push("Add title for book!")
        }

        if(!validateIsString(author)){
            errors.push("Add author for book!")
        }

        if(!validateIsNumber(pages)){
            errors.push("Add pagecount for book!")
        }

        if(!validateIsNumber(stars)){
            errors.push("Add rating for book!")
        }

        if(errors.length > 0){
            setFormState({
                errors,
                validInputs: {
                    title,
                    author, 
                    pages,
                }
            })

            setSliderValue(stars)
            console.log(errors);
            return;
        }
        
        const book = {
            title,
            author, 
            pages,
            stars,
            date,
            id
        }

        if(isEditing){
            editBook(book)
        }
        else {
            addBook(book);
        }
        setMode(null);
    }

    return(
        <div>
        <form onSubmit={newBook}>
            {isEditing ? <FontAwesomeIcon icon={faTrash}  onClick={() => {deleteBook(id), setMode(null)}}/>  : null}
            <FontAwesomeIcon icon={faX} onClick={() => setMode(null)}/>
            <h2>{heading}</h2>
            <section>
                <label>Title</label>
                <input type="text" 
                        placeholder="Book Title" 
                        name="title" 
                        defaultValue={formState.validInputs?.title}/>
                <label>Author</label>
                <input type="text" 
                        placeholder="Book Author" 
                        name="author" 
                        defaultValue={formState.validInputs?.author}/>
                <label>Pages</label>
                <input type="number" 
                        placeholder="Pagecount" 
                        name="pages" 
                        defaultValue={formState.validInputs?.pages}/>
                <label>Rating</label>
                    <span>
                        <input type="range" 
                                name="stars" 
                                min="1" max="5" step="0.5" 
                                defaultValue={sliderValue} 
                                onChange={(event) => setSliderValue(event.target.value)}/>
                        <label>{`${sliderValue} Stars`}</label>
                    </span>
            </section>
            <button>Submit</button>
        </form>
         </div>
    )
}