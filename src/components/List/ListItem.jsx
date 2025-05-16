
export default function ListItem({item}){
    return(
        <span>
            <li>
                <label>Title</label>
                <label>Author</label>
                <label>Read</label>
            </li>
            <li>
            <label>{item.title}</label>
            <label>{item.author}</label>
            <label>{item.date}</label>
        </li>
        </span>
    )
}