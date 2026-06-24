import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/Api";
import { Images, Users } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalGallery: 0, totalCollaborations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/v1/dashboard/stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

          {loading ? (
            <div className="flex space-x-4 animate-pulse">
              <div className="h-32 w-64 bg-gray-200 rounded-2xl"></div>
              <div className="h-32 w-64 bg-gray-200 rounded-2xl"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Stat Card: Gallery */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Gallery Items</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalGallery}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Images size={24} />
                </div>
              </div>

              {/* Stat Card: Collaborations */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Collaborations</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCollaborations}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Users size={24} />
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
