
import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { LayoutDashboard, Images, Users, LogOut, X } from "lucide-react";

const AdminSidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-full bg-white border-r shadow-sm flex flex-col">
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <img src="/JIITECH.png" alt="Jiitech Logo" className="h-10 object-contain mx-auto lg:mx-0" />
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <Link 
          to="/admin-dashboard" 
          onClick={onClose}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/admin-dashboard') ? 'bg-[#C00000]/10 text-[#C00000]' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link 
          to="/admin-gallery" 
          onClick={onClose}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/admin-gallery') ? 'bg-[#C00000]/10 text-[#C00000]' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Images size={20} />
          Gallery
        </Link>
        <Link 
          to="/admin-collaboration" 
          onClick={onClose}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/admin-collaboration') ? 'bg-[#C00000]/10 text-[#C00000]' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Users size={20} />
          Collaborations
        </Link>
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

AdminSidebar.propTypes = {
  onClose: PropTypes.func,
};

export default AdminSidebar;
