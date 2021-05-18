import React from 'react';
import cls from './App.module.scss'
import Routes from "../routes/Routes";
import {SearchPanel} from "../pages/Books";



function App() {

    return (
        <div className={cls.container}>
            <SearchPanel/>
            <Routes/>

        </div>
    );
}

export default App;
