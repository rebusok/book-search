import React, {FC} from 'react';
import cls from './Modal.module.scss'


interface ModalType {
    modal: boolean
    setModal: (value: boolean) => void
}


const Modal: FC<ModalType> = ({modal, setModal, children}) => {
    const finalModalClassName = `${cls.modal} ${modal ? cls.active : ""}`;
    const finalModalContentClassName = `${cls.modal_content} ${modal ? cls.active : ""}`;
    return (
        <div className={finalModalClassName} onClick={ () => setModal(false)}>
            <div className={finalModalContentClassName} onClick={e =>  e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;