
export const getDate = () => {

    const date = new Date();

    return date.toDateString()
}

export const getPageCount = (list) => {

    const pageCount = [...list].reduce((total, book) => {
        return total + parseInt(book.pages)
    }, 0)

    return pageCount;
}