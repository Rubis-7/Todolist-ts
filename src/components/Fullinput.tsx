import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callBack: (title: string) => void
}

export const Fullinput = (props: PropsType) => {

    const [title, setTitle] = useState<string>('')

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickAddTask()
    }
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.callBack(title)
        }
        setTitle('')
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeSetTitle}
                   onKeyPress={onKeyPressAddTask}
            />
            <button onClick={onClickAddTask}>+</button>
        </div>
    );
};


