import React from "react";
import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export default function TaskList({ tasks, refresh }) {
  const updateStatus = async (id, status) => {
    await axios.put(`${API}/${id}`, { status });
    refresh();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    refresh();
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h3>{task.title}</h3>
          <select
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button onClick={() => deleteTask(task._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
