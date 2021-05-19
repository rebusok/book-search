import React from 'react';
import cls from './App.module.scss'
import Routes from "../routes/Routes";
import { Header } from '../components';


function App() {

    return (
        <div className={cls.container}>
            <Header/>
            <Routes/>
        </div>
    );
}

export default App;
