import { createPortal } from "react-dom";
import { useContext, useEffect } from "react";
import { BookContext } from "../../context/BooksContext";
import NewBook from "../NewBook/NewBook";
import { Toaster } from "react-hot-toast";

export default function Modal(){

    const {state, modal} = useContext(BookContext);

    const mode = state.mode ? state.mode : null;
    const isActive = mode?.mode === "add" || mode?.mode === "edit";

    useEffect(() => {
        if(state.mode){
            modal.current.showModal();
            console.log(state.mode)
        }
        else{
            console.log(state.mode)
            modal.current.close();
        }
    }, [state.mode])

    return createPortal(
        <dialog ref={modal} className="backdrop:bg-gray-900/80">
            {isActive ? (
                <>
                    <Toaster position="top-center"/>
                    <NewBook />
                </>
                ) 
            : null}
        </dialog>, document.getElementById("modal")
    )
}