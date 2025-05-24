import { useContext, useState } from "react"
import { BookContext } from "../../context/BooksContext"
import { validateIsString, validateIsNumber } from "./validate";
import { getDate } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";

export default function NewBook(){

    const {state, setMode, updateBookState, fullList} = useContext(BookContext)

    const bookToEdit = state.mode.book ? state.mode.book : null;
    const id = bookToEdit ? bookToEdit.id : fullList.length + 1;
    const date = bookToEdit ? bookToEdit.date : getDate();
    const isEditing = state.mode.mode === "edit";

    let initialState = {
        errors: null,
         validInputs: {
            title: null,
            author: null,
            pages: NaN,
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
            return;
        }
        
        const book = {
            author,
            title, 
            pages,
            stars,
            date,
            id
        }

        if(isEditing){
            setFormState({success: "Book edited!"})
            updateBookState(book, "edit" )
        }
        else {
            setFormState({success: "Book added!"})
            updateBookState(book, "add")
        }

        setTimeout(() => {
            setMode(null);
        }, 1200);
    }

    const labelStyle = "italic font-semibold";
    const inputStyle = "border border-black/80 p-2 rounded-bl-[12px] rounded-tr-[12px]";

    const handleDelete = () => {
        updateBookState(id, "del");
        setTimeout(() => {
            setMode(null)
        }, 1000);
    }

    return(
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-white p-1 w-5/6 lg:w-2/8 rounded-bl-[12px] rounded-tr-[12px]">
        <form onSubmit={newBook}>
            <header className="flex flex-row gap-5 p-4">
                <FontAwesomeIcon icon={faX} onClick={() => setMode(null)}/>
                {isEditing ? <FontAwesomeIcon icon={faTrash}  onClick={handleDelete} className="text-red-500"/>  : null}
            </header>
            <h2 className="text-[18px] font-medium px-5">{heading}</h2>
            <section className="flex flex-col justify-center px-10">
                <label className={labelStyle}>Title</label>
                <input type="text" 
                        placeholder="Book Title" 
                        name="title" 
                        defaultValue={formState.validInputs?.title}
                        className={inputStyle}/>
                <label className={labelStyle}>Author</label>
                <input type="text" 
                        placeholder="Book Author" 
                        name="author" 
                        defaultValue={formState.validInputs?.author}
                        className={inputStyle}/>
                <label className={labelStyle}>Pages</label>
                <input type="number" 
                        placeholder="Pagecount" 
                        name="pages" 
                        defaultValue={formState.validInputs?.pages}
                        className={inputStyle}/>
                <label className={labelStyle}>Rating</label>
                    <span className="flex flex-row gap-5">
                        <input type="range" 
                                name="stars" 
                                min="1" max="5" step="0.5" 
                                defaultValue={sliderValue} 
                                onChange={(event) => setSliderValue(event.target.value)}/>
                        <label>{`${sliderValue} Stars`}</label>
                    </span>
            </section>
            <section className="flex flex-col w-full items-center justify-center list-disc animate-pulse">
                {formState.errors?.length > 0 ? formState.errors.map((error, i) => <li key={i}>{error}</li>) : null}
                {formState.success && <label>{formState.success}</label>}
            </section>
            <footer className="flex w-full mt-5 justify-center items-center">
                <button className="border border-black bg-gray-800/70 text-white w-40 p-1 rounded-bl-[12px] rounded-tr-[12px] italic font-medium">Submit</button>
            </footer>
        </form>
         </div>
    )
}