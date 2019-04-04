import React, { Component } from "react";

const restfulAPI = "https://jsonplaceholder.typicode.com/todos";

const Checkbox = props => (
  <input type="checkbox" {...props} />
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { filter: "id", tasks: []};
  }

  componentDidMount() {
    fetch(`${restfulAPI}`)
      .then(response => response.json())
      .then(tasks => this.setState({ tasks }));
  }

  toggleCompleteTask = (id, e) => {
    const task = this.state.tasks.find(task => task.id === id);
    if (!this.state.tasks) return;

    let newTasks = [];
        for (let i = 0; i < this.state.tasks.length; i++) {
          newTasks = newTasks.concat(
            id === this.state.tasks[i].id
              ? { ...this.state.tasks[i], completed: !task.completed }
              : this.state.tasks[i]
          );
        }
        this.setState({
          tasks: newTasks
        });

    fetch(`${restfulAPI}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !task.completed
      }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json));
  }

  getSortedTasks = () => {
    return this.state.tasks.sort((a, b) => {
      if (this.state.filter === "id") {
        return a.id > b.id ? 1 : -1;
      }

      if (this.state.filter === "completed") {
        return a.completed ? -1 : 1;
      }

      if (this.state.filter === "title") return a.title > b.title ? 1: -1;
    });
  };

  setFilterCompleted = () => {
    this.setState({ filter: "completed" });
  }

  setFilterId = () => {
    this.setState({ filter: "id" });
  }

  setFilterTitle = () => {
    this.setState({ filter: "title" });
  }

  addTask = () => {
    const task = document.getElementById("newTask").value;
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: task,
        userId: 1,
        completed: false
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => this.setState({ tasks: this.state.tasks.concat({ ...json, id: this.state.tasks.length + 1 }) }));
  };


  render() {
    const tasks = this.getSortedTasks();

    return (
      <div className="main">
        <div>
          Add Task: <input id="newTask" />
          <button onClick={this.addTask}>Add</button>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={this.setFilterCompleted}>✓</th>
              <th onClick={this.setFilterId}>ID</th>
              <th onClick={this.setFilterTitle}>Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>
                  {task.completed ? (
                    <Checkbox
                      checked={task.completed}
                      onChange={(e) => this.toggleCompleteTask(task.id, e)}
                    />
                  ) : (
                    <Checkbox
                      checked={task.completed}
                      onChange={(e) => this.toggleCompleteTask(task.id, e)}
                      />
                  )}
                </td>
                <td>{task.id}</td>
                <td className="strikethrough">{task.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
