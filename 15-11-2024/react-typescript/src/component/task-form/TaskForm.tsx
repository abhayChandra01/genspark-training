// src/components/TaskForm.tsx

import React, { useState } from "react";

interface TaskFormProps {
  addTask: (taskText: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex justify-between gap-5 items-center"
    >
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Enter a new task"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded min-w-[120px] disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={taskText.trim()?.length == 0}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
