import {AppReducer, AppType} from "./AppReducer/AppReducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {SearchActionType, SearchBooksReducer} from "./SearchBooksReducer/SearchBooksReducer";
import {BookInfoActionType, BookItemReducer} from "./BookItem/BookItemReducer";

const reducer = combineReducers({
    app: AppReducer,
    searchBooks: SearchBooksReducer,
    bookInfo: BookItemReducer,
})
const middleware = applyMiddleware(thunkMiddleware)
export const store = createStore(reducer, composeWithDevTools(middleware));
export type AppRootStateType = ReturnType<typeof reducer>
export type AppActionType = AppType | SearchActionType | BookInfoActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AppActionType>
export default store

//@ts-ignore
window.store = store;