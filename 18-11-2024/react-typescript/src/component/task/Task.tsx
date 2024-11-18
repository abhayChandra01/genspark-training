import React from "react";

interface TaskProps {
  task: { id: number; text: string; completed: boolean };
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({
  task,
  toggleTaskCompletion,
  deleteTask,
}) => {
  return (
    <li
      className={`flex justify-between items-center p-4 border rounded-lg shadow-sm ${
        task.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <div
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.text}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleTaskCompletion(task.id)}
          className={`${
            task.completed ? `bg-yellow-500` : `bg-green-500`
          } text-white px-2 py-1 rounded mr-2`}
        >
          Mark as {task.completed ? `Incomplete` : `Complete`}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
