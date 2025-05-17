import { createPortal } from "react-dom";
import { useContext, useEffect } from "react";
import { BookContext } from "../../context/BooksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import NewBook from "../NewBook/NewBook";

export default function Modal(){

    const {state, modal, setMode} = useContext(BookContext);

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
        <dialog ref={modal}>
            <FontAwesomeIcon icon={faX} onClick={() => setMode(null)}/>
            {isActive ? <NewBook /> : null}
        </dialog>, document.getElementById("modal")
    )
}