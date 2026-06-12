import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="d-flex flex-column bg-light border-end shadow-sm"
      style={{
        width: "275px",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <h3 className="fw-bold text-primary ">Task Manager</h3>

      <hr />

      {/* Links */}
      <div className="d-flex flex-column gap-2">
        <Link
          to="/"
          className={`btn text-start ${
            isActive("/") ? "btn-primary text-white" : "btn-outline-primary"
          }`}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/tasks"
          className={`btn text-start ${
            isActive("/tasks")
              ? "btn-primary text-white"
              : "btn-outline-primary"
          }`}
        >
          {user?.role === "User" ? "📌 My Tasks" : "📌 All Tasks"}
        </Link>

        {user?.role === "Admin" && (
          <>
            <hr />

            <small className="text-muted">ADMIN PANEL</small>

            <Link
              to="/admin/users"
              className={`btn text-start ${
                isActive("/admin/users")
                  ? "btn-danger text-white"
                  : "btn-outline-danger"
              }`}
            >
              👤 User Management
            </Link>

            <Link
              to="/admin/tasks"
              className={`btn text-start ${
                isActive("/admin/tasks")
                  ? "btn-danger text-white"
                  : "btn-outline-danger"
              }`}
            >
              📋 Task Monitoring
            </Link>

            <Link
              to="/admin/logs"
              className={`btn text-start ${
                isActive("/admin/logs")
                  ? "btn-danger text-white"
                  : "btn-outline-danger"
              }`}
            >
              📜 Activity Logs
            </Link>
          </>
        )}
      </div>

      {/* Logout */}
      <div className=" pt-5 mt-5">
        <button className="btn btn-dark w-100" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
