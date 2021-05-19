import React, {FC, ReactNode} from 'react';
import cls from './Modal.module.scss'


interface ModalType {
    modal: boolean
    setModal: (value: boolean) => void
    onClose: () => void
    children: ReactNode
}


const Modal: FC<ModalType> = ({modal, children, onClose}) => {
    const finalModalClassName = `${cls.modal} ${modal ? cls.active : ""}`;
    const finalModalContentClassName = `${cls.modal_content} ${modal ? cls.active : ""}`;
    return (
        <div className={finalModalClassName} onClick={() => onClose()}>
            <div className={finalModalContentClassName} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;