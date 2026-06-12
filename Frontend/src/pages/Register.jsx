import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await API.post("/auth/register", formData);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Update these column classes to match your Login component exactly */}
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          
          <div className="card shadow-sm rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Register</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-2">
                  Register
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="mb-0">
                  Do you have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;