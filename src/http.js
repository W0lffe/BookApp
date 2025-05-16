
const URL = "https://www.cc.puv.fi/~e2301740/books/bookAPI.php";



export const fetchData = async() => {

    try {
        const response = await fetch(`${URL}`, {
            method: "GET",
        })

        if(!response.ok){
            throw new Error("Error occured fetching data!")
        }

        const data = await response.json();
        return data;

    } catch (error) {
        return error;
    } 

}

export const postData = async (data) => {

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

    } catch (error) {
        return error;
    }
}