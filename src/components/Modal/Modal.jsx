import { createPortal } from "react-dom";
import { useContext, useEffect } from "react";
import { BookContext } from "../../context/BooksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function Modal(){

    const {state, modal, setMode} = useContext(BookContext);

    useEffect(() => {
        if(state.mode){
            modal.current.showModal();
        }
        else{
            modal.current.close();
        }
    }, [state.mode])

    return createPortal(
        <dialog ref={modal}>
            <FontAwesomeIcon icon={faX} onClick={() => setMode(null)}/>
        </dialog>, document.getElementById("modal")
    )
}