import React from "react";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";

function TaskList({
  isCompletedView,
  tasks,
  completedTasks,
  onDelete,
  onComplete,
  onDeleteCompleted,
  onEdit,
  currentEditIndex,
  currentEditedTask,
  setCurrentEditedTask,
  onUpdate,
}) {
  return (
    <div className="task-list">
      {!isCompletedView &&
        tasks.map((task, index) =>
          currentEditIndex === index ? (
            <EditTask
              key={index}
              task={currentEditedTask}
              setTask={setCurrentEditedTask}
              onUpdate={onUpdate}
            />
          ) : (
            <TaskItem
              key={index}
              task={task}
              onDelete={() => onDelete(index)}
              onComplete={() => onComplete(index)}
              onEdit={() => onEdit(index, task)}
              isCompleted={false}
            />
          )
        )}

      {isCompletedView &&
        completedTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onDelete={() => onDeleteCompleted(index)}
            isCompleted={true}
          />
        ))}
    </div>
  );
}

export default TaskList;
