import React, { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import Tabs from "./components/Tabs";
import Stats from "./components/Stats";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isCompletedView, setIsCompletedView] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [currentEditedTask, setCurrentEditedTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedCompleted = JSON.parse(localStorage.getItem("completedTasks"));
    if (savedTasks) setTasks(savedTasks);
    if (savedCompleted) setCompletedTasks(savedCompleted);
  }, []);

  const handleAddTask = (title, description) => {
    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const newTask = { title, description };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCompleteTask = (index) => {
    const now = new Date().toLocaleString();
    const completedTask = { ...tasks[index], completedOn: now };

    const updatedCompletedTasks = [...completedTasks, completedTask];
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));

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
        <TaskInput onAdd={handleAddTask} />

        <Stats pending={tasks.length} completed={completedTasks.length} />

        <Tabs
          isCompletedView={isCompletedView}
          setIsCompletedView={setIsCompletedView}
        />

        <TaskList
          isCompletedView={isCompletedView}
          tasks={tasks}
          completedTasks={completedTasks}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
          onDeleteCompleted={handleDeleteCompletedTask}
          onEdit={handleEditTask}
          currentEditIndex={currentEditIndex}
          currentEditedTask={currentEditedTask}
          setCurrentEditedTask={setCurrentEditedTask}
          onUpdate={handleUpdateTask}
        />
      </div>
    </div>
  );
}

export default App;
