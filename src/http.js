
import { URL } from "./api";

export const fetchData = async() => {

    try {
        const response = await fetch(`${URL}`, {
            method: "GET",
        })

        if(!response.ok){
            throw new Error("Error occured fetching data!")
        }

        const data = await response.json();
        return {success: true, books: data};

    } catch (error) {
        console.log(error.message)
        return {success: false, error: error.message, books: []};
    } 

}

export const postData = async (data) => {

    console.log(data)

    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            throw new Error("Error posting data!")
        }

        console.log(response)
        return {success: true, response}

    } catch (error) {
        console.log(error.message)
        return {success: false, error: error.message};
    }
}
