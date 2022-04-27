import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';

type PropsType = {
    todolistID: string
    tasksForTodolist: Array<TaskType>
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTask: (todolistID: string, taskId: string) => void
}

const MapComponent = ({todolistID, tasksForTodolist, removeTask, changeTaskStatus, ...props}: PropsType) => {
    return (
        <div>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const onClickHandler = () => removeTask(todolistID, t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeHandler}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    })
                }
            </ul>
        </div>
    );
};

export default MapComponent;