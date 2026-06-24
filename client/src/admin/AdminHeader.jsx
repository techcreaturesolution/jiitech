
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-8">
      <div className="text-xl font-extrabold tracking-tight">
        <span className="text-[#0d8246]">JII</span>
        <span className="text-[#C00000]">TECH</span>
        <span className="ml-2 font-medium text-gray-500">ADMIN</span>
      </div>
      <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-[#C00000] transition">
        Back to Home
      </Link>
    </header>
  );
};

export default AdminHeader;
