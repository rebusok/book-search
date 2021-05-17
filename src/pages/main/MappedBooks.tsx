import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {AppRootStateType} from "../../store/store";
import cls from './MappedBooks.module.scss'
import Api, {sizeTypeCover} from "../../api/api";
import Paginator from "../../Common/Paginator/PaginatorComponent";
import {searchBooksFetch} from "../../store/SearchBooksReducer/SearchBooksReducer";
import {RoutingType} from "../../routes/Routes";


const MappedBooks = () => {
    const {docs, start} = useSelector((state:AppRootStateType) =>  state.searchBooks)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [booksPerPage, setBooksPerPage] = useState<number>(10)

    // getCurrentBooks
    const indexLastBooks = currentPage * booksPerPage - start;
    const fetchIndex = indexLastBooks - booksPerPage + start  // для запроса
    const indexFirstBooks = fetchIndex - start; // для пагинатора
    const dispatch = useDispatch()
    const curentBooks = docs.slice(indexFirstBooks, indexLastBooks)
    const searchValue = 'harry potter'



    useEffect(() => {
        if(indexLastBooks > 100 || indexFirstBooks < 0) {
            Api.searchBook(searchValue, Math.ceil((fetchIndex +1) / 100 )).then(res => {
                console.log(res)
                dispatch(searchBooksFetch(res.data))
            })
            console.log('FETCH', Math.ceil((fetchIndex +1) / 100 ) , fetchIndex)
        }

    })
    const onPageChangeHandler = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }
    return (
        <div className={cls.searchContent}>
            {docs && docs.length > 0
                ? <ul>
                    {curentBooks.map(book => {
                        return (
                            <li key={book.key} className={cls.searchItem}>
                                <div className={cls.bookcover}>
                                    <Link to={`${RoutingType.main}${book.key}`}> <img src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-${sizeTypeCover.MEDIUM}.jpg`} alt=""/></Link>
                                </div>
                                <div className={cls.details}>
                                    <div className={cls.title}>
                                        <Link to={`${RoutingType.main}${book.key}`}> <h3>{book.title}</h3></Link>

                                    </div>
                                    <div className={cls.autor}>by
                                       {book.author_name}
                                    </div>
                                    <div className={cls.publisher}>First published in {book.first_publish_year}</div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                : null
            }
            <Paginator pageSize={10} totalCount={217} onPageChangeHandler={onPageChangeHandler} currentPage={currentPage}/>
        </div>
    );
}

export default MappedBooks;