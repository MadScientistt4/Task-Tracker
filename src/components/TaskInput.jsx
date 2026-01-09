import React, { useState } from "react";

function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-input">
      <div className="task-input-item">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="task-input-item">
        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
        />
      </div>

      <div className="task-input-item">
        <button className="primaryBtn" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
}

export default TaskInput;
