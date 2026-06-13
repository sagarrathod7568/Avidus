import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

const TaskMonitoring = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/admin/tasks");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;

    try {
      await API.delete(`/admin/tasks/${id}`);

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
        <h2>Task Monitoring</h2>

        <div className="table-responsive">
  <table className="table table-striped table-hover align-middle">

    <thead className="table-dark">
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>User</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {tasks.map((task) => (
        <tr key={task._id}>
          <td>{task.title}</td>

          <td>
            <span className="badge bg-info">
              {task.status}
            </span>
          </td>

          <td>{task.createdBy?.name || "N/A"}</td>

          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>
      </div>
    </div>
  );
};

export default TaskMonitoring;
