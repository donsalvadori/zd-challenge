import React from "react";

const AddTask = props => (
  <div>
    Add Task: <input id="newTask" />
    <button onClick={props.onClick}>Add</button>
  </div>
)

export default AddTask;