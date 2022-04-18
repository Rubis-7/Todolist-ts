import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    title: string
    setTitle: (title: string) => void
    callBack: () => void
    error: string
    setError: any
}

const Input = (props: PropsType) => {

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError('')
        if (e.key === 'Enter') props.callBack()
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }
    return (
        <input className={props.error ? 'error' : ''}
               value={props.title}
               onChange={onChangeSetTitle}
               onKeyPress={onKeyPressAddTask}
        />
    );
};

export default Input;