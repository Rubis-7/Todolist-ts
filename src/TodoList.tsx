import React, {KeyboardEvent, ChangeEvent, useState, FC} from 'react';
import {FilterValuesType} from './App';

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
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onClickAddTask()
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }
    const tasksListItems = props.tasks.map(t =>
        <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => props.removeTask(t.id)}>x</button>
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
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={changeFilter('all')}>All</button>
                <button onClick={changeFilter('active')}>Active</button>
                <button onClick={changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
};

export default TodoList;