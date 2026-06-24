import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/Api";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors");
      return;
    }

    try {
      await axiosInstance.post("/auth/register", form);
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/admin-login"), 800);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error registering");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-lg border-t-4 border-[#dc2626]">

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#dc2626] mb-6">
          Admin Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={`w-full border p-3 rounded-lg text-sm sm:text-base ${
                errors.name ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              value={form.name}
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={`w-full border p-3 rounded-lg text-sm sm:text-base ${
                errors.email ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              value={form.email}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`w-full border p-3 rounded-lg text-sm sm:text-base ${
                errors.password ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              value={form.password}
            />
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button className="w-full bg-[#dc2626] text-white py-3 rounded-lg text-sm sm:text-base hover:bg-red-700 transition">
            Register
          </button>
        </form>

        <p className="text-xs sm:text-sm font-bold text-center text-[#dc2626] mt-6">
          Already have an account?{" "}
          <Link
            className="bg-[#dc2626] text-white rounded-lg py-1 px-2"
            to="/admin-login"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
