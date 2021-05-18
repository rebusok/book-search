import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from "react";
import cls from './SuperSelect.module.scss'


type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: number[]
    onChangeOption?: (option: number) => void
    value?: number
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options ? options.map(op => (
         <option key={op} value={op} >{op}</option>
    )): [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
       
        if (onChangeOption){
            onChangeOption(+e.target.value)
            
        }
        if (onChange) {
            onChange(e)
            
        }
        
    }

    return (
        <div className={cls.myBox}>
            <select onChange={onChangeCallback} {...restProps}>
                {mappedOptions}
            </select>
        </div>
    );
}

export default SuperSelect;
