import React, {FC, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import Modal from "../../components/Modal/Modal";
import {RoutingType} from "../../routes/Routes";

interface PropsType {
    open:boolean
    onClose: () =>  void
}

const BookItemInfo:FC<PropsType> = ({open, onClose}) => {
     const {bookId} = useParams<{ bookId: string }>()
    const [modal, setModal] = useState<boolean>(true)
    console.log(bookId)
    if(!modal) {
        return  <Redirect to={RoutingType.main}/>
    }
    return (
        <div>
            <Modal modal={open} setModal={setModal} onClose={onClose}>TEST</Modal>
        </div>
    );
};

export default BookItemInfo;