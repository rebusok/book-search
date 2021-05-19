import React from 'react';
import cls from './Header.module.scss'
import logo from '../../image/book.svg'
import {SearchPanel} from "../../pages/Books";

const Header = () => {
    return (
        <header className={cls.header}>
            <div className={cls.logoWrapper}>
                <div className={cls.logo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={cls.headerTitle}>
                    <h1>Найди свою <hr/> книгу</h1>
                </div>
            </div>
            <div className={cls.searchPanel}>
                <SearchPanel/>
            </div>
        </header>
    );
};

export default Header;