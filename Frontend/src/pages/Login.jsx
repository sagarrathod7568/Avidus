import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);
      login(res.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Responsive constraints: full width on mobile, half on tablets, 1/3 on large screens */}
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* w-100 makes the button stretch the full width of its container */}
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    Register
                  </Link>
                </p>
              </div>
              <p className="small text-muted mt-3 alert alert-info">
                <strong>Note:</strong> Users can register and log in using their
                own credentials. Admin access is restricted to the fixed
                credentials below.
                <hr />
                <strong>Admin Credentials:</strong>
                <br />
                Email: admin@gmail.com
                <br />
                Password: Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
