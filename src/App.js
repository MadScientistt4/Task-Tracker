import React, { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    console.log("Saving tasks:", tasks);
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks, hasLoaded]);

  const handleAddTask = (title, description) => {
    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>

      <div className="task-wrapper">
        <TaskInput onAdd={handleAddTask} />

        <KanbanBoard
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default App;
