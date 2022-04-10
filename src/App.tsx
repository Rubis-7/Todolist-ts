import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to Learn'

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }
    let taskForRender = tasks
    if (filter === 'active') {
        taskForRender = tasks.filter((f) => f.isDone)
    }
    if (filter === 'completed') {
        taskForRender = tasks.filter((f) => !f.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;