import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ➕ CREATE (ONLY USER)
  const createTask = async (e) => {
    e.preventDefault();

    if (user.role === "Admin") return;

    try {
      await API.post("/tasks", formData);

      setFormData({
        title: "",
        description: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // ✏️ UPDATE (ONLY USER)
  const updateStatus = async (id, status) => {
    if (user.role === "Admin") return;

    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ DELETE (ONLY USER)
  const deleteTask = async (id) => {
    if (user.role === "Admin") return;

    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="container mt-4"
        style={{
          height: "95vh",
          overflow: "auto",
        }}
      >
        <h2>{user?.role === "User" ? "My Tasks" : "All Tasks"}</h2>

        {/* 🚫 HIDE CREATE FORM FOR ADMIN */}
        {user.role !== "Admin" && (
          <form onSubmit={createTask} className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              className="form-control mb-2"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              className="form-control mb-2"
              value={formData.description}
              onChange={handleChange}
            />

            <button className="btn btn-primary">Create Task</button>
          </form>
        )}

        {/* TABLE */}
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>

                <td>
                  {/* 🚫 ADMIN CAN ONLY VIEW */}
                  {user.role === "Admin" ? (
                    <span className="badge bg-info">{task.status}</span>
                  ) : (
                    <select
                      className="form-select"
                      value={task.status}
                      onChange={(e) => updateStatus(task._id, e.target.value)}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  )}
                </td>

                <td>
                  {/* 🚫 ADMIN NO ACTION */}
                  {user.role !== "Admin" ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <span className="text-muted">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManagement;
