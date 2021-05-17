import React, {useState} from 'react';
import {SuperButton, SuperInputText} from "../components";
import Api from "../api/api";
import {useDispatch, useSelector} from "react-redux";
import {searchBooksFetch, setSearchValueA} from "../store/SearchBooksReducer/SearchBooksReducer";
import {AppRootStateType} from "../store/store";
import cls from './App.module.scss'
import MappedBooks from "../pages/main/MappedBooks";
import Paginator from "../Common/Paginator/PaginatorComponent";
import Routes from "../routes/Routes";


function App() {
    const [searchValueH, setSearchValueH] = useState<string>('harry potter')
    const dispatch = useDispatch()
    const {searchValue, docs} = useSelector((state:AppRootStateType) =>  state.searchBooks)
    console.log(docs)
    const searchHandler = () => {
        dispatch(setSearchValueA(searchValue))
        Api.searchBook(searchValueH).then(res => {
            console.log(res)
            dispatch(searchBooksFetch(res.data))
        })
    }

    return (
        <div className={cls.container}>
            <SuperInputText onChangeText={setSearchValueH} value={searchValueH} placeholder={'Поиск книг'}/>
            <SuperButton onClick={searchHandler}>
                Search
            </SuperButton>
            <Routes/>

        </div>
    );
}

export default App;
