import React from 'react';
import {FilterValuesType} from '../App';


type ButtonPropsType = {
    name: string
    callBack: () => void
    error?: string
    filter?: FilterValuesType
}

const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <>
            <button className={props.filter === props.name ? 'active-filter' : ''}
                    onClick={onClickHandler}>{props.name}</button>
            {props.error && <div className={'error-message'}>{props.error}</div>}
        </>
    );
};

export default Button;