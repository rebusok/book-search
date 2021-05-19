import React, {FC, useCallback, useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {RoutingType} from "../../../routes/Routes";
import cls from './BookItemInfo.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {fetchBookInfo} from "../../../store/BookItem/BookItemReducer";
import {Modal} from "../../../components";
import {sizeTypeCover, StatusFetchEnum, urlImg} from "../../../data/constant/rootConst";


interface PropsType {
    open: boolean
    onClose: () => void
}

const BookItemInfo: FC<PropsType> = ({open, onClose}) => {
        const {bookId} = useParams<{ bookId: string }>()
        const [modal, setModal] = useState<boolean>(true)
        const {bookInfo, selectBook} = useSelector((state: AppRootStateType) => state.bookInfo)
        const {status, errorMes} = useSelector((state: AppRootStateType) => state.app)
        const dispatch = useDispatch();
        const stableDispatch = useCallback(dispatch, [dispatch])
        useEffect(() => {
            if (!bookId) return
            stableDispatch(fetchBookInfo(bookId))
        }, [bookId, stableDispatch])
        if (!modal) {
            return <Redirect to={RoutingType.main}/>
        }
        if (status === StatusFetchEnum.LOADING) {
            return (
                <Modal modal={open} setModal={setModal} onClose={onClose}>
                    <div/>
                </Modal>
            )
        }
        if (status === StatusFetchEnum.FAIL) {
            return (
                <Modal modal={open} setModal={setModal} onClose={onClose}>
                    <div>{errorMes}</div>
                </Modal>
            )
        }
        return (
            <>
                <Modal modal={open} setModal={setModal} onClose={onClose}>
                    <div className={cls.btnCloseWrap}>
                        <button className={cls.btnClose} onClick={() => onClose()}>X</button>
                    </div>
                    {bookInfo && selectBook && modal
                        ? <div className={cls.contentInfo}>
                            <div className={cls.coverInfo}>
                                <img
                                    src={`${urlImg}${selectBook.cover_edition_key}${sizeTypeCover.LARGE}.jpg`}
                                    alt=""/>
                            </div>
                            <div>
                                <div className={cls.titleInfo}>
                                    <h3>{selectBook.title}</h3>
                                </div>
                                {selectBook.author_name ?
                                    <div>
                                        {selectBook.author_name.length > 1 ? 'Autors' : 'Autor'}: {selectBook.author_name.slice(0, 3).join(', ')}
                                    </div>
                                    : null
                                }
                                <div>
                                    год публикации: {selectBook.first_publish_year}
                                </div>
                                <div>
                                    Издатель: {selectBook.publisher ? selectBook.publisher.slice(0, 3).join(', ') : null}
                                </div>
                                <div>
                                    ISBN книги: {selectBook.isbn ? selectBook.isbn.slice(0, 3).join(', ') : null}
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </Modal>
            </>
        );
    }
;

export default BookItemInfo;