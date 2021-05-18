import React, {useState} from 'react'
import styles from './Paginator.module.css'
import cn from "classnames"
import SuperSelect from "../../components/SuperSelect/SuperSelect";

//Paginators
type PropsType = {
    totalCount: number
    pageSize: number
    currentPage?: number
    onPageChangeHandler?: (pageNumber: number) => void
    portionSize?: number
    onSelectHandler: (options: number) => void
}

const Paginator: React.FC<PropsType> = ({
                                            totalCount, pageSize,
                                            currentPage = 1,
                                            onPageChangeHandler = x => x,
                                            onSelectHandler,
                                            portionSize = 10
                                        }) => {

    const pagesCount = Math.ceil(totalCount / pageSize);
    const optionsSelect = [5, 10, 20]
    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return <div className={cn(styles.paginator)}>
        {portionNumber > 1 &&
        <button className={styles.btn} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber)}
                             key={p}
                             onClick={(e) => {
                                 onPageChangeHandler(p);
                             }}>{p}</span>
            })}
        {pages.length > 0 ? <SuperSelect value={pageSize} options={optionsSelect} onChangeOption={onSelectHandler}/> : null}
        {portionCount > portionNumber &&
        <button className={styles.btn} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>NEXT</button>}


    </div>
}

export default Paginator;