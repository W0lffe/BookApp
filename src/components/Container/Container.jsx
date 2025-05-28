import List from "../List/List"
import Toolbar from "../Toolbar/Toolbar"
import Modal from "../Modal/Modal"
import { Toaster } from "react-hot-toast"

export default function Container(){

    return(
        <div className="flex flex-col w-full lg:w-fit max-h-fit items-center justify-center p-2">
            <div>
                <Toaster position='top-center'/> 
            </div>
            <Modal /> 
            <Toolbar />
            <List />
        </div>
    )
}