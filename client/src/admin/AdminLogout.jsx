import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token
    localStorage.removeItem("token");

    // Optional: clear any other stored data
    // localStorage.clear();

    // Redirect to login
    navigate("/admin-login");
  }, [navigate]);

  return null; // no UI needed
};

export default Logout;
