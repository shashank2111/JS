import React, {useState} from 'react';
import TodoTask  from './TodoTask';
import Control from './Control';

export default function Todo() {
    const [task, setTask] = useState("")
    const [todosList, setTodosList] = useState([])
    const [category, setCategory] = useState(0)
    
    let tasks = todosList.map((t) => {
      return (
        <TodoTask
          key={t.id}
          id={t.id}
          value={t.value}
          isDone={t.isDone}
          toggleDone={toggleDone}
          deleteTask={deleteTask}
        />
      );
    });

    if(category === 0) {
        tasks = todosList.map((t) => {
          return (
            <TodoTask
              key={t.id}
              id={t.id}
              value={t.value}
              isDone={t.isDone}
              toggleDone={toggleDone}
              deleteTask={deleteTask}
            />
          );
        });
    } else if(category === 1) {
        tasks = todosList.map((t) => {
          return (t.isDone === false) ? (
            <TodoTask
              key={t.id}
              id={t.id}
              value={t.value}
              isDone={t.isDone}
              toggleDone={toggleDone}
              deleteTask={deleteTask}
            />
          ) : null;
        });
    } else if(category === 2) {
        tasks = todosList.map((t) => {
          return t.isDone === true ? (
            <TodoTask
              key={t.id}
              id={t.id}
              value={t.value}
              isDone={t.isDone}
              toggleDone={toggleDone}
              deleteTask={deleteTask}
            />
          ) : null;
        });
    }

    function clearCompleted() {
        setTodosList( (prevTodoList) => {
            const newTodosList = prevTodoList.filter((t) => {
                return (t.isDone === false)
            })
            return [...newTodosList]
        })
    }

    function changeCategory(categoryId) {
        if(category !== categoryId) {
            setCategory(categoryId)
        }
    }

    function deleteTask(id){
        setTodosList( (prevTodosList)=> {
            const newTodosList = prevTodosList.filter((t)=>{return t.id !== id})
            return [...newTodosList]
        } )
    }

    function toggleDone(id) {
        setTodosList( (prevTodosList) => {
            const newTodosList = prevTodosList.map( (p) => {
                return (p.id === id) ? {
                    ...p, isDone: !p.isDone
                } : {...p}
            })
            return [...newTodosList]

        })
    }

    function handleInputChange(e) {
        let value = e.target.value
        setTask(value)
    }
    
    function handleTaskAdd(e) {
        if(e.keyCode === 13) {
            setTodosList( (prevTodosList) => {
                return [ {id: Date.now(), value: task, isDone: false}, ...prevTodosList]
            })
            e.target.value = ''
        }
    }

    return (
        <div className="todo-body">
            <input className="todo-input" placeholder="Add To-Do here..." onChange={handleInputChange} onKeyDown={handleTaskAdd} />
            {tasks}
            {todosList.length > 0 && 
            <Control 
                todosList = {todosList} 
                changeCategory = {changeCategory}
                clearCompleted = {clearCompleted}
            />}
        </div>
    )
}