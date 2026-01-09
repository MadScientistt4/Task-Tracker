import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

function KanbanBoard({ tasks, onDelete, onUpdate, onStatusChange }) {
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newStatus =
      destination.droppableId === "pending" ? "pending" : "completed";

    onStatusChange(draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
      <Column
        title={`Pending (${pendingTasks.length})`}
        droppableId="pending"
        tasks={pendingTasks}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onStatusChange={onStatusChange}
      />

      <Column
        title={`Completed (${completedTasks.length})`}
        droppableId="completed"
        tasks={completedTasks}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onStatusChange={onStatusChange}
      />


      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
