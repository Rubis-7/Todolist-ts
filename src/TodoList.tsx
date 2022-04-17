import React, {KeyboardEvent, ChangeEvent, useState, FC} from 'react';
import {FilterValuesType} from './App';
import Button from './components/Button';
import Input from './components/Input';
import {Fullinput} from './components/Fullinput';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

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


    const tasksListItems = props.tasks.map((t) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
            <span>{t.title}</span>
            <Button name={'x'} callBack={() => onClickHandler(t.id)}/>
        </li>
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                {/*<Fullinput callBack={onClickAddTask}/>*/}
                <Input title={title} setTitle={setTitle} callBack={onClickAddTask}/>
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