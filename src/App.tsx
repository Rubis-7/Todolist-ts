import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export  type  TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, setTodolist] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    });

    const removeTodoList = (todolistID: string) => {
      setTodolist(todolist.filter(e=>e.id!==todolistID))
        delete tasks[todolistID]
    }
    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(e=>e.id!==taskId)})
    //     let filteredTasks = tasks.filter(t => t.id !== id);
    //     setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
            let newTask = {id: v1(), title: title, isDone: false};
        //     let newTasks = [task, ...tasks];
        //     setTasks(newTasks);
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        }

        function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
            // let task = tasks.find(t => t.id === taskId);
            // if (task) {
            //     task.isDone = isDone;
            // }

        //     setTasks([...tasks]);
            setTasks({...tasks,[todolistID]: tasks[todolistID].map(e=>e.id===taskId ? {...e, isDone }: e)})
        }


        // let tasksForTodolist = tasks;
        //
        // if (filter === "active") {
        //     tasksForTodolist = tasks.filter(t => t.isDone === false);
        // }
        // if (filter === "completed") {
        //     tasksForTodolist = tasks.filter(t => t.isDone === true);
        // }

        function changeFilter(todolistID: string, value: FilterValuesType) {
            setTodolist(todolist.map(e => e.id === todolistID ? {...e, filter: value} : e))
        }


        return (
            <div className="App">
                {todolist.map((e) => {
                    let tasksForTodolist = tasks[e.id];

                    if (e.filter === 'active') {
                        tasksForTodolist = tasks[e.id].filter(t => t.isDone === false);
                    }
                    if (e.filter === 'completed') {
                        tasksForTodolist = tasks[e.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            key={e.id}
                            todolistID={e.id}
                            title={e.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={e.filter}
                            removeTodoList={removeTodoList}
                        />
                    )
                })}
            </div>
        );
    }

    export default App;
