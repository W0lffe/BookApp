
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

export const getTitle = (count) => {

    console.log(count)
    
    const titles = [
        { minBooks: 0, maxBooks: 0, name: "Unread Scrolls Enthusiast" },
        { minBooks: 1, maxBooks: 3, name: "Page Turner Trainee" },
        { minBooks: 4, maxBooks: 7, name: "Bookmark Bandit" },
        { minBooks: 8, maxBooks: 12, name: "Plot Twister Extraordinaire" },
        { minBooks: 13, maxBooks: 20, name: "Literary Lurker" },
        { minBooks: 21, maxBooks: 30, name: "Chapter Conqueror" },
        { minBooks: 31, maxBooks: 40, name: "Paragraph Pioneer" },
        { minBooks: 41, maxBooks: 50, name: "Bookworm Warrior" },
        { minBooks: 51, maxBooks: 70, name: "Narrative Ninja" },
        { minBooks: 71, maxBooks: 100, name: "Prologue Prophet" },
        { minBooks: 101, maxBooks: 150, name: "Epic Explorer" },
        { minBooks: 151, maxBooks: 200, name: "Legendary Lorekeeper" }
    ]

    const gotTitle = titles.filter((title) => count >= title.minBooks && count <= title.maxBooks);
    

    return gotTitle[0].name;
}
