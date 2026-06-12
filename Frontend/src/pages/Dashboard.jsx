import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [analytics, setAnalytics] =
    useState({
      totalUsers: 0,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
    });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (user?.role === "Admin") {
      fetchAnalytics();
    }
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get(
        "/analytics"
      );

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container mt-4">
        <h2>
          Welcome {user?.name}
        </h2>

        <p>
          Role: {user?.role}
        </p>

        {user?.role === "Admin" && (
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card p-3">
                <h5>Total Users</h5>
                <h2>
                  {
                    analytics.totalUsers
                  }
                </h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h5>Total Tasks</h5>
                <h2>
                  {
                    analytics.totalTasks
                  }
                </h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h5>Completed</h5>
                <h2>
                  {
                    analytics.completedTasks
                  }
                </h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card p-3">
                <h5>Pending</h5>
                <h2>
                  {
                    analytics.pendingTasks
                  }
                </h2>
              </div>
            </div>
          </div>
        )}

        {user?.role === "User" && (
          <div className="alert alert-info mt-4">
            Welcome to Task
            Management System
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;