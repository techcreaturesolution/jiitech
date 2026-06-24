
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";

const AdminHeader = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-gray-900">
          <Menu size={24} />
        </button>
        <div className="text-xl font-extrabold tracking-tight">
          <span className="text-[#0d8246]">JII</span>
          <span className="text-[#C00000]">TECH</span>
          <span className="ml-2 font-medium text-gray-500 hidden sm:inline">ADMIN</span>
        </div>
      </div>
      <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-[#C00000] transition">
        Back to Home
      </Link>
    </header>
  );
};

AdminHeader.propTypes = {
  onMenuClick: PropTypes.func,
};

export default AdminHeader;
