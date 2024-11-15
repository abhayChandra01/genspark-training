import React, { useState } from "react";
import TaskForm from "../../component/task-form/TaskForm";
import Task from "../../component/task/Task";

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  const addTask = (taskText: string) => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, text: taskText, completed: false },
    ]);
  };

  const toggleTaskCompletion = (id: number) => {
    let updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    if (window.confirm("Are you sure? This action can't be undone.") === true) {
      let filteredTasks = tasks.filter((task) => task.id !== id);

      setTasks(filteredTasks);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <TaskForm addTask={addTask} />
      <ul className="space-y-4 mt-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
