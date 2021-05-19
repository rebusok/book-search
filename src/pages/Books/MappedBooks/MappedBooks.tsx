import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {AppRootStateType} from "../../../store/store";
import cls from './MappedBooks.module.scss'
import {ResponseBookType,} from "../../../api/api";
import {fetchBooks} from "../../../store/SearchBooksReducer/SearchBooksReducer";
import {RoutingType} from "../../../routes/Routes";
import {addSelectBook} from "../../../store/BookItem/BookItemReducer";
import {Paginator, Spinner} from "../../../Common";
import {sizeTypeCover, StatusFetchEnum, urlImg} from "../../../data/constant/rootConst";


const MappedBooks = () => {
    const {docs, start, searchValue, numFound} = useSelector((state: AppRootStateType) => state.searchBooks)
    const {status, errorMes} = useSelector((state: AppRootStateType) => state.app)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [booksPerPage, setBooksPerPage] = useState<number>(10)
    const dispatch = useDispatch()
    const stableDispatch = useCallback(dispatch, [dispatch])
    // getCurrentBooks
    const indexLastBooks = currentPage * booksPerPage - start;
    const fetchIndex = indexLastBooks - booksPerPage + start  // для запроса
    const indexFirstBooks = fetchIndex - start; // для пагинатора

    const curentBooks = docs.slice(indexFirstBooks, indexLastBooks)


    useEffect(() => {
        if (indexLastBooks > 100 || indexFirstBooks < 0) {
            stableDispatch(fetchBooks(searchValue, Math.ceil((fetchIndex + 1) / 100)))
        }

    }, [searchValue, indexLastBooks, indexFirstBooks, fetchIndex, stableDispatch])
    useEffect(() => {
        if (searchValue) stableDispatch(fetchBooks(searchValue))
        else return
    }, [searchValue, stableDispatch])
    const onPageChangeHandler = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }
    const selectBookHandler = (book: ResponseBookType) => {
        dispatch(addSelectBook(book))
    }
    if (status === StatusFetchEnum.LOADING) {
        return <Spinner/>
    }
    if (status === StatusFetchEnum.FAIL) {
        return <div>{errorMes}</div>
    }
    return (
        <div className={cls.searchContent}>
            {docs && docs.length > 0
                ? <ul>
                    {curentBooks.map(book => {
                        return (
                            <li key={book.key} className={cls.searchItem}>
                                <div className={cls.bookcover}>
                                    <Link to={`${RoutingType.main}${book.key}`} onClick={() => selectBookHandler(book)}>
                                        <img src={`${urlImg}${book.cover_edition_key}${sizeTypeCover.MEDIUM}.jpg`}
                                             alt=""/></Link>
                                </div>
                                <div className={cls.details}>
                                    <div className={cls.title}>
                                        <Link to={`${RoutingType.main}${book.key}`}
                                              onClick={() => selectBookHandler(book)}><h3>{book.title}</h3></Link>

                                    </div>
                                    <div className={cls.autor}>by {book.author_name}
                                    </div>
                                    <div className={cls.publisher}>First published in {book.first_publish_year}</div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                : null
            }
            <Paginator pageSize={booksPerPage} totalCount={numFound}
                       onSelectHandler={setBooksPerPage}
                       onPageChangeHandler={onPageChangeHandler}
                       currentPage={currentPage}/>
        </div>
    );
}

export default MappedBooks;