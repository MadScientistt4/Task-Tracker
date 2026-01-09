import React from "react";

function EditTask({ task, setTask, onUpdate }) {
  return (
    <div className="edit-wrapper">
      <input
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Updated Title"
      />

      <textarea
        rows={3}
        value={task.description}
        onChange={(e) =>
          setTask({ ...task, description: e.target.value })
        }
        placeholder="Updated Description"
      />

      <button className="primaryBtn" onClick={onUpdate}>
        Update
      </button>
    </div>
  );
}

export default EditTask;
