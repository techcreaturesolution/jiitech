import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/Api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
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
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      toast.success("Login Successful!", { position: "top-center" });

      setTimeout(() => navigate("/admin-dashboard"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed", {
        position: "top-center",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      
      {/* Header Placeholder (Matches main site style) */}
      <header className="w-full border-b shadow-sm py-4 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mock Logo matching image */}
          <div className="text-2xl font-extrabold tracking-tight">
            <span className="text-[#0d8246]">JII</span>
            <span className="text-[#C00000]">TECH</span>
          </div>
        </div>
        <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-[#C00000] transition">
          BACK TO HOME
        </Link>
      </header>

      {/* Main Login Area */}
      <div className="flex-1 flex justify-center items-center px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Admin Portal
            </h2>
            <p className="text-sm text-gray-500 mt-2">Sign in to manage the dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="admin@jiitech.com"
                className={`w-full border p-3.5 rounded-xl text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#C00000]/20 focus:border-[#C00000] transition ${
                  errors.email ? "border-red-500 ring-red-500/20" : "border-gray-200"
                }`}
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className={`w-full border p-3.5 rounded-xl text-sm sm:text-base outline-none focus:ring-2 focus:ring-[#C00000]/20 focus:border-[#C00000] transition ${
                  errors.password ? "border-red-500 ring-red-500/20" : "border-gray-200"
                }`}
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1.5 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#C00000] text-white py-3.5 rounded-xl text-sm sm:text-base font-semibold hover:bg-[#a00000] active:scale-[0.98] transition shadow-md shadow-[#C00000]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
      
    </div>
  );
};

export default AdminLogin;
