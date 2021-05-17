import {ResponseBookType} from "../../api/api";


interface stateType {
    booksSearch: Array<ResponseBookType>
    num_found: number
    numFound: number
    start: number
    searchValue:string
}
const initialState:stateType = {
    searchValue: '',
    booksSearch: [] as Array<ResponseBookType>,
    num_found: 0,
    numFound: 0,
    start: 0,
}

export const SearchBooksReducer =(state:stateType = initialState, action:any):stateType => {
    switch (action.type) {

        default:
            return state
    }
}