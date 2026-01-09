import React, { useEffect, useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompletedView, setIsCompletedView] = useState(false);

  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [currentEditedTask, setCurrentEditedTask] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedCompleted = JSON.parse(localStorage.getItem("completedTasks"));

    if (savedTasks) setTasks(savedTasks);
    if (savedCompleted) setCompletedTasks(savedCompleted);
  }, []);

  const handleAddTask = () => {
    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const newTask = { title, description };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTitle("");
    setDescription("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCompleteTask = (index) => {
    const now = new Date().toLocaleString();
    const completedTask = {
      ...tasks[index],
      completedOn: now,
    };

    const updatedCompletedTasks = [...completedTasks, completedTask];
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );

    handleDeleteTask(index);
  };

  const handleDeleteCompletedTask = (index) => {
    const updatedCompleted = [...completedTasks];
    updatedCompleted.splice(index, 1);

    setCompletedTasks(updatedCompleted);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompleted));
  };

  const handleEditTask = (index, task) => {
    setCurrentEditIndex(index);
    setCurrentEditedTask(task);
  };

  const handleUpdateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[currentEditIndex] = currentEditedTask;

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setCurrentEditIndex(null);
    setCurrentEditedTask(null);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>

      <div className="task-wrapper">
        <div className="task-input">
          <div className="task-input-item">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div className="task-input-item">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="task-input-item">
            <button onClick={handleAddTask} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="stats">
          <span>Pending: {tasks.length}</span>
          <span>Completed: {completedTasks.length}</span>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompletedView && "active"}`}
            onClick={() => setIsCompletedView(false)}
          >
            Pending
          </button>

          <button
            className={`secondaryBtn ${isCompletedView && "active"}`}
            onClick={() => setIsCompletedView(true)}
          >
            Completed
          </button>
        </div>

        <div className="task-list">
          {!isCompletedView &&
            tasks.map((task, index) => {
              if (currentEditIndex === index) {
                return (
                  <div className="edit-wrapper" key={index}>
                    <input
                      value={currentEditedTask.title}
                      onChange={(e) =>
                        setCurrentEditedTask({
                          ...currentEditedTask,
                          title: e.target.value,
                        })
                      }
                      placeholder="Updated Title"
                    />

                    <textarea
                      rows={3}
                      value={currentEditedTask.description}
                      onChange={(e) =>
                        setCurrentEditedTask({
                          ...currentEditedTask,
                          description: e.target.value,
                        })
                      }
                      placeholder="Updated Description"
                    />

                    <button
                      className="primaryBtn"
                      onClick={handleUpdateTask}
                    >
                      Update
                    </button>
                  </div>
                );
              }

              return (
                <div className="task-item" key={index}>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className="status pending">Pending</span>
                  </div>

                  <div className="icons">
                    <MdDelete
                      className="icon delete"
                      onClick={() => handleDeleteTask(index)}
                    />
                    <BsCheckLg
                      className="icon check"
                      onClick={() => handleCompleteTask(index)}
                    />
                    <AiOutlineEdit
                      className="icon edit"
                      onClick={() => handleEditTask(index, task)}
                    />
                  </div>
                </div>
              );
            })}

          {isCompletedView &&
            completedTasks.map((task, index) => (
              <div className="task-item" key={index}>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <span className="status completed">Completed</span>
                  <p className="time">Completed on: {task.completedOn}</p>
                </div>

                <MdDelete
                  className="icon delete"
                  onClick={() => handleDeleteCompletedTask(index)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
