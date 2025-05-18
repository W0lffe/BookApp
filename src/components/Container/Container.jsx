import List from "../List/List"
import Toolbar from "../Toolbar/Toolbar"
import Modal from "../Modal/Modal"

export default function Container(){
    return(
        <div className="app-container">
            <Modal />
            <Toolbar />
            <List />
        </div>
    )
}