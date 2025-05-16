import { books } from "./dummy";

const URL = "";

export const fetchData = async() => {

   /*  try {
        const response = await fetch(`${URL}/booksAPI.php`, {
            method: "GET",
        })

        if(!response.ok){
            throw new Error("Error occured fetching data!")
        }

        const data = await response.json();
        return data;

    } catch (error) {
        return error;
    } */

    return books;
}