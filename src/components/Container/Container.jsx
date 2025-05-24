import List from "../List/List"
import Toolbar from "../Toolbar/Toolbar"
import Modal from "../Modal/Modal"

export default function Container(){
    return(
        <div className="flex flex-col w-full lg:w-fit h-fit items-center justify-center">
            <Modal />
            <Toolbar />
            <List />
        </div>
    )
}