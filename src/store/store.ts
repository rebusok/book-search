import {AppReducer, AppType} from "./AppReducer/AppReducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
const reducer = combineReducers({
    app: AppReducer,
})
const middleware = applyMiddleware(thunkMiddleware)
export const store = createStore(reducer, composeWithDevTools(middleware));
export type AppRootStateType = ReturnType<typeof reducer>
export type AppActionType = AppType
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppActionType
    >
export default store

//@ts-ignore
window.store = store;