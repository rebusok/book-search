import React, {useEffect, useState} from 'react';
import {SuperButton, SuperInputText} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {setSearchValueA} from "../../../store/SearchBooksReducer/SearchBooksReducer";
import {AppRootStateType} from "../../../store/store";
import cls from './SearchPanel.module.scss'


const SearchPanel = () => {
    const [searchValueH, setSearchValueH] = useState<string>('')
    const [timerId, setTimerId] = useState<number>(0);
    const {disableBtn} = useSelector((state: AppRootStateType) => state.app)
    const dispatch = useDispatch()
    const stop = () => {
        clearTimeout(timerId);
    }
    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        }
    },[timerId])
    const start = (value: string) => {
        setSearchValueH(value)
        stop();
        const id: number = window.setTimeout(() => {
            dispatch(setSearchValueA(value.trim()))
        }, 2000);
        setTimerId(id);
    }
    const searchHandler = () => {
        dispatch(setSearchValueA(searchValueH))
    }
    return (
        <div className={cls.searchPanel}>
            <SuperInputText disabled={disableBtn} onChangeText={setSearchValueH} value={searchValueH} placeholder={'Поиск книг'} startTimer={start}/>
            <SuperButton onClick={searchHandler} disabled={disableBtn} >
                Search
            </SuperButton>
        </div>
    );
};

export default SearchPanel;