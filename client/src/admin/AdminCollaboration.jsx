/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axiosInstance from "../api/Api";
import { Users, Plus, X, Loader2, ArrowRight, Image, Trash2, Pencil } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { CollabModal } from "../Components/Collaboration";

const ACADEMIC_YEARS = [];
for (let year = 2025; year >= 1999; year--) {
  ACADEMIC_YEARS.push(`${year} - ${year + 1}`);
}

const AdminCollaboration = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    academicYear: "",
    title: "",
    description: "",
    date: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      const res = await axiosInstance.get("/v1/collaboration");
      if (res.data.success) {
        setCollaborations(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching collaborations:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collaboration?")) return;
    try {
      const res = await axiosInstance.delete(`/v1/collaboration/${id}`);
      if (res.data.success) {
        fetchCollaborations();
      }
    } catch (error) {
      console.error("Error deleting collaboration:", error);
      alert("Failed to delete collaboration.");
    }
  };

  const handleEdit = (collab) => {
    setEditingId(collab._id);
    setFormData({
      academicYear: collab.academicYear,
      title: collab.title,
      description: collab.description,
      date: collab.date,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("academicYear", formData.academicYear);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);

      if (image) {
        data.append("image", image);
      } else if (!editingId) {
        alert("Please select an image");
        setLoading(false);
        return;
      }

      const res = editingId
        ? await axiosInstance.put(`/v1/collaboration/${editingId}`, data, { headers: { "Content-Type": "multipart/form-data" } })
        : await axiosInstance.post("/v1/collaboration", data, { headers: { "Content-Type": "multipart/form-data" } });

      if (res.data.success) {
        setShowForm(false);
        setEditingId(null);
        setFormData({ academicYear: "", title: "", description: "", date: "" });
        setImage(null);
        fetchCollaborations(); // Refresh list
      }
    } catch (error) {
      console.error("Error creating collaboration:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar />

      <main className="flex-1 flex flex-col">
        <AdminHeader />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users size={28} className="text-[#C00000]" /> Manage Collaborations
            </h1>
            {!showForm && (
              <button 
                onClick={() => {
                  setShowForm(true);
                  setEditingId(null);
                  setFormData({ academicYear: "", title: "", description: "", date: "" });
                  setImage(null);
                }}
                className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition"
              >
                <Plus size={20} /> Add Collaboration
              </button>
            )}
          </div>

          {showForm ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-6">{editingId ? "Edit Collaboration" : "Add New Collaboration"}</h2>

              <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700">Academic Year</label>
                    <select 
                      name="academicYear" 
                      value={formData.academicYear} 
                      onChange={handleInputChange} 
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200"
                    >
                      <option value="" disabled>Select Academic Year...</option>
                      {ACADEMIC_YEARS.map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700">Date</label>
                    <input 
                      type="date" name="date" placeholder="e.g. 28-08-2025"
                      value={formData.date} onChange={handleInputChange} required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Title</label>
                  <input 
                    type="text" name="title" placeholder="e.g. Exploring Partnership Opportunities..."
                    value={formData.title} onChange={handleInputChange} required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea 
                    name="description" rows="4" placeholder="Write a short description..." required
                    value={formData.description} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Upload Media (Single Image)</label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100/50 transition-colors duration-200 group overflow-hidden">
                    <input 
                      type="file" accept="image/*" onChange={handleFileChange} required={!editingId}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="p-6 text-center pointer-events-none">
                      <div className="w-12 h-12 mb-3 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto text-gray-400 group-hover:text-[#C00000] group-hover:scale-110 transition-all duration-300">
                        <Image size={24} />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {image ? <span className="text-[#C00000]">{image.name}</span> : "Click or drag an image here to upload"}
                      </p>
                      <p className="text-xs text-gray-500 px-4">
                        {image ? "1 file selected" : editingId ? "Select a new image to replace or leave empty to keep existing." : "Select a single image for the collaboration."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 pb-2">
                  <button 
                    type="submit" disabled={loading}
                    className="w-full bg-[#C00000] text-white font-bold py-3.5 rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={22} /> : (
                      <>
                        {editingId ? <Pencil size={22} /> : <Plus size={22} />} 
                        {editingId ? "Update Collaboration" : "Upload Collaboration"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fetching ? (
                <div className="col-span-3 text-center py-10 text-gray-500">Loading collaborations...</div>
              ) : collaborations.length === 0 ? (
                <div className="col-span-3 text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500">No collaborations uploaded yet.</p>
                </div>
              ) : (
                collaborations.map((collab, index) => {
                  const imageUrl = `http://localhost:5000${collab.image}`;
                  return (
                    <div
                      key={collab._id}
                      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col animate-slide-in-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Main Image */}
                      <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                        <img
                          src={imageUrl}
                          alt={collab.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Top Left Badge */}
                        <div className="absolute top-4 left-4 z-20 bg-[#C00000] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                          COLLABORATION
                        </div>
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEdit(collab); }}
                            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-blue-600 shadow-sm transition-colors"
                            aria-label="Edit collaboration"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(collab._id); }}
                            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-red-600 shadow-sm transition-colors"
                            aria-label="Delete collaboration"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 pt-8 flex flex-col flex-grow relative bg-white z-20">
                        {/* Date Badge */}
                        <div className="absolute -top-4 right-6 z-30 bg-[#C00000] text-white px-4 py-1.5 rounded-xl shadow-lg font-bold text-sm">
                          {collab.date}
                        </div>
                        <h3 className="text-xl font-bold text-[#0a192f] mb-3 leading-tight line-clamp-2">
                          {collab.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                          {collab.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <button 
                            onClick={() => setSelectedCollab(collab)}
                            className="flex items-center text-sm font-semibold text-gray-400 hover:text-[#0d8246] transition-colors duration-300 group/btn"
                          >
                            View Details
                            <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </main>

      {/* View Details Modal */}
      {selectedCollab && (
        <CollabModal 
          item={{
            ...selectedCollab,
            image: `http://localhost:5000${selectedCollab.image}`
          }} 
          onClose={() => setSelectedCollab(null)} 
        />
      )}
    </div>
  );
};

export default AdminCollaboration;
