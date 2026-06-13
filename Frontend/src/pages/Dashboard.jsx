import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.role === "Admin") {
      fetchAnalytics();
    }
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics");

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container mt-4">
        <div className="d-flex align-items-center gap-2">
          <h2>
            Welcome{" "}
            <span
              className={
                user?.role === "Admin" ? "text-danger" : "text-primary"
              }
            >
              {user?.name}
            </span>
          </h2>
          <p
            className={
              user?.role === "Admin" ? "badge bg-success" : "badge bg-danger"
            }
          >
            {user?.role}
          </p>
        </div>

        {user?.role === "Admin" && (
          <div className="row mt-4 g-3">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="card p-3 h-100 text-center">
                <h6>Total Users</h6>
                <h3>{analytics.totalUsers}</h3>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="card p-3 h-100 text-center border-primary text-primary">
                <h6>Total Tasks</h6>
                <h3>{analytics.totalTasks}</h3>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="card p-3 h-100 text-center border-success text-success">
                <h6>Completed</h6>
                <h3>{analytics.completedTasks}</h3>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="card p-3 h-100 text-center border-warning text-warning">
                <h6>Pending</h6>
                <h3>{analytics.pendingTasks}</h3>
              </div>
            </div>
          </div>
        )}

        {user?.role === "User" && (
          <div className="alert alert-info mt-4">
            Welcome to Task Management System 🚀
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
