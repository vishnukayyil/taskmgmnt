import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import "./styles/App.css";

const API = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="app-container">
      <h1>📝 Task Management App</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} refresh={fetchTasks} />
    </div>
  );
}

export default App;
