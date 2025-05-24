
export const sort = (params) => {
    
    const list = params.fullList;
    const key = params.key;

    console.log(list)
    const sorted = [...list].sort((a,b) => {
        let valueA;
        let valueB;

        switch(key){
            case "title":
                valueA = a.title;
                valueB = b.title;
                return valueA.localeCompare(valueB);
            case "author":
                valueA = a.author;
                valueB = b.author;
                return valueA.localeCompare(valueB);
            case "date":
                valueA = new Date (a.date);
                valueB = new Date (b.date);
                return valueB - valueA;
            case "stars":
                valueA = a.stars;
                valueB = b.stars;
                return valueB - valueA;
        }
    })

    return sorted;
}

export const filter = (params) => {
    const list = params.fullList;
    const value = params.key;

    const filtered = [...list].filter((book) => 
        book.title.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase())
    )

    return filtered;
}