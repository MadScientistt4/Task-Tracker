import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

function Column({ title, droppableId, tasks, onDelete, onUpdate, onStatusChange}) {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="kanban-column-content"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length === 0 && (
                <div className="empty-state">
                    No tasks 👋 (Drag&Drop)
                </div>
            )}

            {tasks.map((task, index) => (
                <TaskCard
  key={task.id}
  task={task}
  index={index}
  onDelete={onDelete}
  onUpdate={onUpdate}
  onStatusChange={onStatusChange}
/>


            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
