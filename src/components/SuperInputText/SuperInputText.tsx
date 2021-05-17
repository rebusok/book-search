import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, ReactNode, useState} from "react";
import s from "./SuperInputText.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;


type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: boolean
    spanClassName?: string
    errorMes?: string
    setError?:(value:boolean) => void
    className?:string
    children?: ReactNode
};

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        errorMes,
        onBlur,
        setError,
        value,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e);

        onChangeText && onChangeText(e.currentTarget.value);
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter"
        && onEnter
        && onEnter();
    }
    const [ErrorBlur, setErrorBlur] = useState<boolean>(false)
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = `${s.superInput} ${ErrorBlur && error ? s.errorInput : className ? s[className] : ''}`; // need to fix with (?:) and s.superInput

    const onBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
        if (error) {
            onBlur && onBlur(e)
            setErrorBlur(true)
        } else if (!value){
            onBlur && onBlur(e)
            setErrorBlur(true)
            setError && setError(true)
        } else {
            setErrorBlur(false)
        }
    }
    return (
        <>
            <input
                type={type ? type : 'text'}
                onChange={onChangeCallback}
                value={value}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                onBlur={ onBlurHandler}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            {ErrorBlur && error ? <span className={finalSpanClassName}>{errorMes}</span> :
                <span className={finalSpanClassName}> </span>}
        </>
    );
}

export default SuperInputText;
