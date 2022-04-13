import React, {KeyboardEvent, ChangeEvent, useState, FC} from 'react';
import {FilterValuesType} from './App';
import Button from './components/Button';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        }
        setTitle('')
    }
    const onClickHandler = (taskID: string) => {
        props.removeTask(taskID)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickAddTask()
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }
    const tasksListItems = props.tasks.map(t =>
        <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <Button name={'x'} callBack={() => onClickHandler(t.id)}/>
        </li>
    )

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressAddTask}
                />
                <Button name={'+'} callBack={onClickAddTask}/>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <Button name={'all'} callBack={() => changeFilterHandler('all')}/>
                <Button name={'active'} callBack={() => changeFilterHandler('active')}/>
                <Button name={'completed'} callBack={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    )
};

export default TodoList;