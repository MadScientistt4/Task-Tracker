import React, { useState } from "react";

function EditTask({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  return (
    <div className="edit-wrapper">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Updated title"
      />

      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Updated description"
      />

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          className="primaryBtn"
          onClick={() =>
            onSave({ ...task, title, description })
          }
        >
          Save
        </button>

        <button className="secondaryBtn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditTask;
