import React from 'react';

export default function TodoTask(props) {

    const styles = {
        'todo-name': {
            textDecoration: (props.isDone ? 'line-through' :'none')
        }, 
        'todo-circle-inner': {
            display: (props.isDone ? 'block' : 'none')
        }
    }

    return (
      <div className="todo-task">
        <div className="todo-task-left">
            <div className="todo-circle" onClick={()=>{props.toggleDone(props.id)}}>
                <div className="todo-circle-inner" style={styles['todo-circle-inner']}></div>
            </div>
            <div className="todo-text">
            <span className="todo-name" style={styles['todo-name']}>
                {props.value}
            </span>
            </div>
        </div>
        <div>
            <i class="fa fa-times" aria-hidden="true" onClick={()=>{props.deleteTask(props.id)}}></i>
        </div>
      </div>
    );
}