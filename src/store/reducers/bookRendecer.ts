import { Book } from "../../interface/interface";
const initialBook: Book[] = JSON.parse(localStorage.getItem("books") || "[]");

export const bookReducer = (state = initialBook, action: any) => {
    switch (action.type) {
        case "ADD_BOOK":
            const newStateAdd = [...state, action.payload];
            localStorage.setItem("books", JSON.stringify(newStateAdd));
            return newStateAdd;
        case "DELETE_BOOK":
            const newStateDelete = state.filter(book => book.id !== action.payload);
            localStorage.setItem("books", JSON.stringify(newStateDelete));
            return newStateDelete;
        case "UPDATE_STATUS":
            const updatedState = state.map(book => {
                if (book.id === action.payload) {
                    return { ...book, status: !book.status };
                }
                return book;
            });
            localStorage.setItem("books", JSON.stringify(updatedState));
            return updatedState;
        case "UPDATE_BOOK":
            const updatedBookState = state.map(book => {
                if (book.id === action.payload.id) {
                    return action.payload;
                }
                return book;
            });
            localStorage.setItem("books", JSON.stringify(updatedBookState));
            return updatedBookState;
        case "LOAD_BOOK_SELECT":
            if (action.payload === null) {
                return state;
            }
            return state.filter((book) => book.status === action.payload);
        default:
            return state;
    }
}