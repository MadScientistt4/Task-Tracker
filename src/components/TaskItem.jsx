import React from "react";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

function TaskItem({ task, onDelete, onComplete, onEdit, isCompleted }) {
  return (
    <div className="task-item">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        {!isCompleted && <span className="status pending">Pending</span>}
        {isCompleted && (
          <>
            <span className="status completed">Completed</span>
            <p className="time">Completed on: {task.completedOn}</p>
          </>
        )}
      </div>

      <div>
        <MdDelete className="icon delete" onClick={onDelete} />

        {!isCompleted && (
          <>
            <BsCheckLg className="icon check" onClick={onComplete} />
            <AiOutlineEdit className="icon edit" onClick={onEdit} />
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
