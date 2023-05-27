import React from 'react';

export default function Control(props) {

    const allElement = document.querySelector(".all");
    const activeElement = document.querySelector(".active");
    const completedElement = document.querySelector(".completed");

    function handleClick(e) {
        allElement.classList.remove("current")
        activeElement.classList.remove('current');
        completedElement.classList.remove('current');
        if(e.currentTarget.classList.contains("all")){
            console.log("All")
            props.changeCategory(0)
            e.currentTarget.classList.add("current");
        } else if (e.currentTarget.classList.contains('active')) {
            console.log('Active');
            props.changeCategory(1)
            e.currentTarget.classList.add('current');
        } else if (e.currentTarget.classList.contains('completed')) {
            console.log('Completed');
            props.changeCategory(2);
            e.currentTarget.classList.add('current');
        } else {
            console.log('clear completed');
            props.clearCompleted()
        }
    }
    
    function isLeft(total, curr) {
        return total + (curr.isDone ? 0 : 1);
    }

    return (
      <div className="control">
        <div className="control-buttons-left">
          <p>{props.todosList.reduce(isLeft,0)} items left</p>
        </div>
        <div className="control-buttons-right">
            <div className="all control-buttons current" onClick={(e) => handleClick(e)}>
              <span>All</span>
            </div>
            <div className="active control-buttons" onClick={handleClick}>
              <span>Active</span>
            </div>
            <div className="completed control-buttons" onClick={handleClick}>
              <span>Completed</span>
            </div>
            <div className="clear control-buttons" onClick={handleClick}>
              <span>clear completed</span>
            </div>
        </div>
      </div>
    );
}