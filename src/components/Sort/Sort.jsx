import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBook, faPen, faFile } from "@fortawesome/free-solid-svg-icons";
export default function Sort(){

    return(
        <div>
            <input type="text" placeholder="Search by title or author" />
            <section>
                <FontAwesomeIcon icon={faBook} />
                <FontAwesomeIcon icon={faPen} />
                <FontAwesomeIcon icon={faFile} />
                <FontAwesomeIcon icon={faStar} />
            </section>
        </div>
    )
}