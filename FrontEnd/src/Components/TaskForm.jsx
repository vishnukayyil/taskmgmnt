import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a task name");

    try {
      await axios.post(API, { title });
      setTitle("");
      onTaskAdded(); // refresh task list
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task. Check console.");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new task..."
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
