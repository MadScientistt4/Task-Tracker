import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import EditTask from "./EditTask";

function TaskCard({ task, index, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <EditTask
              task={task}
              onCancel={() => setIsEditing(false)}
              onSave={(updatedTask) => {
                onUpdate(updatedTask);
                setIsEditing(false);
              }}
            />
          ) : (
            <>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>

              <div>
                <AiOutlineEdit
                  className="icon edit"
                  onClick={() => setIsEditing(true)}
                />
                <MdDelete
                  className="icon delete"
                  onClick={() => onDelete(task.id)}
                />
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
