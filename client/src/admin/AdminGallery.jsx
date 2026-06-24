import { useState, useEffect } from "react";

import axiosInstance, { serverURL, getImageUrl } from "../api/Api";
import { Images, Plus, X, Loader2, Trash2, Pencil } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { GalleryModal } from "../Components/GallerySection";

const ACADEMIC_YEARS = [];
for (let year = 2025; year >= 1999; year--) {
  ACADEMIC_YEARS.push(`${year} - ${year + 1}`);
}

const AdminGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [modalEvent, setModalEvent] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    academicYear: "",
    event: "",
    customEvent: "",
    title: "",
    description: "",
    date: "",
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const eventOptions = [
    "Independence Day", "Republic Day", "Annual Function Day",
    "Diwali", "Holi", "Navratri", "Dussehra", "Onam", "Pongal", "Eid",
    "Cherry Blossom Festival", "Tanabata", "Gion Matsuri", "Japanese New Year",
    "Other"
  ];

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await axiosInstance.get("/v1/gallery");
      if (res.data.success) {
        setGalleries(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching galleries:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery?")) return;
    try {
      const res = await axiosInstance.delete(`/v1/gallery/${id}`);
      if (res.data.success) {
        fetchGalleries();
      }
    } catch (error) {
      console.error("Error deleting gallery:", error);
      alert("Failed to delete gallery.");
    }
  };

  const handleEdit = (gal) => {
    setEditingId(gal._id);
    setFormData({
      academicYear: gal.academicYear,
      event: eventOptions.includes(gal.event) ? gal.event : "Other",
      customEvent: eventOptions.includes(gal.event) ? "" : gal.event,
      title: gal.title,
      description: gal.description,
      date: gal.date,
    });
    setExistingImages(gal.images || []);
    setShowForm(true);
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalEvent = formData.event === "Other" ? formData.customEvent : formData.event;

      const data = new FormData();
      data.append("academicYear", formData.academicYear);
      data.append("event", finalEvent);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("date", formData.date);
      data.append("retainedImages", JSON.stringify(existingImages));

      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }

      const res = editingId 
        ? await axiosInstance.put(`/v1/gallery/${editingId}`, data, { headers: { "Content-Type": "multipart/form-data" } })
        : await axiosInstance.post("/v1/gallery", data, { headers: { "Content-Type": "multipart/form-data" } });

      if (res.data.success) {
        setShowForm(false);
        setEditingId(null);
        setFormData({ academicYear: "", event: "", customEvent: "", title: "", description: "", date: "" });
        setImages([]);
        setExistingImages([]);
        fetchGalleries(); // Refresh list
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
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
              <Images size={28} className="text-[#C00000]" /> Manage Gallery
            </h1>
            {!showForm && (
              <button 
                onClick={() => {
                  setShowForm(!showForm);
                  if (showForm) {
                    setEditingId(null);
                    setFormData({ academicYear: "", event: "", customEvent: "", title: "", description: "", date: "" });
                    setImages([]);
                    setExistingImages([]);
                  }
                }}
                className="flex items-center gap-2 bg-[#C00000] text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition"
              >
                <Plus size={20} /> Add Gallery
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
              <h2 className="text-xl font-bold mb-6">{editingId ? "Edit Gallery" : "Add New Gallery"}</h2>

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
                    <label className="block text-sm font-semibold text-gray-700">Event Date <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input 
                      type="date" name="date" placeholder="e.g. 15 Apr 2025"
                      value={formData.date} onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Event Type</label>
                  <select 
                    name="event" value={formData.event} onChange={handleInputChange} required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200"
                  >
                    <option value="" disabled>Select an Event...</option>
                    {eventOptions.map(evt => <option key={evt} value={evt}>{evt}</option>)}
                  </select>
                </div>

                {formData.event === "Other" && (
                  <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-sm font-semibold text-gray-700">Custom Event Name</label>
                    <input 
                      type="text" name="customEvent" placeholder="Enter custom event"
                      value={formData.customEvent} onChange={handleInputChange} required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Title</label>
                  <input 
                    type="text" name="title" placeholder="e.g. Cultural Exchange Program"
                    value={formData.title} onChange={handleInputChange} required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea 
                    name="description" rows="3" placeholder="Write a short description..." required
                    value={formData.description} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:border-[#C00000] focus:ring-4 focus:ring-red-500/10 outline-none transition-all duration-200 placeholder:text-gray-400 resize-none"
                  ></textarea>
                </div>

                {editingId && existingImages.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700">Existing Images</label>
                    <div className="flex gap-3 flex-wrap">
                      {existingImages.map((img, i) => (
                        <div key={i} className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden group shadow-sm">
                          <img src={getImageUrl(img)} alt="existing" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => handleRemoveExistingImage(i)}
                            className="absolute top-1 right-1 bg-black text-white rounded-full p-1 opacity-100 hover:bg-gray-800 transition-all shadow-md transform"
                            title="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">Upload Media (Images)</label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100/50 transition-colors duration-200 group overflow-hidden">
                    <input 
                      type="file" multiple accept="image/*" onChange={handleFileChange} required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="p-6 text-center pointer-events-none">
                      <div className="w-12 h-12 mb-3 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto text-gray-400 group-hover:text-[#C00000] group-hover:scale-110 transition-all duration-300">
                        <Images size={24} />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        {images.length > 0 ? <span className="text-[#C00000]">{images.length} file(s) selected</span> : "Click or drag images here to upload"}
                      </p>
                      <p className="text-xs text-gray-500 px-4 line-clamp-1">
                        {images.length > 0 
                          ? Array.from(images).map(f => f.name).join(', ')
                          : editingId ? "Select new images to append or leave empty to keep existing." : "Select multiple images at once. The first image will be used as the cover."}
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
                        {editingId ? "Update Gallery" : "Upload Gallery"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fetching ? (
                <div className="col-span-3 text-center py-10 text-gray-500">Loading galleries...</div>
              ) : galleries.length === 0 ? (
                <div className="col-span-3 text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500">No galleries uploaded yet.</p>
                </div>
              ) : (
                galleries.map((gal, index) => {
                  const eventImages = gal.images.map(img => `${serverURL}${img}`);
                  const thumbnails = eventImages.slice(1);
                  return (
                    <div
                      key={gal._id}
                      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col animate-slide-in-left"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Main Image */}
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img
                          src={eventImages[0]}
                          alt={gal.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                          {gal.location || "Jiitech"}
                        </div>
                        {/* Action Buttons */}
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEdit(gal); }}
                            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-blue-600 shadow-sm transition-colors"
                            aria-label="Edit gallery"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(gal._id); }}
                            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-gray-700 hover:text-red-600 shadow-sm transition-colors"
                            aria-label="Delete gallery"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Thumbnails Row */}
                      <div className="px-6 -mt-6 sm:-mt-8 relative z-20 flex gap-2">
                        {thumbnails.slice(0, 3).map((thumb, tIdx) => (
                          <div key={tIdx} className="flex-1 h-12 sm:h-16 rounded-xl overflow-hidden border-2 border-white shadow-md bg-gray-100 relative group/thumb">
                            <img src={thumb} alt="thumbnail" className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                          </div>
                        ))}
                        {Array.from({ length: Math.max(0, 3 - thumbnails.length) }).map((_, i) => (
                          <div key={`empty-${i}`} className="flex-1 h-12 sm:h-16 rounded-xl border-2 border-white shadow-md bg-gray-50" />
                        ))}
                      </div>

                      {/* Content */}
                      <div className="p-5 sm:p-6 pt-3 sm:pt-4 flex flex-col flex-grow relative bg-white z-20">
                        <div className="absolute -top-10 sm:-top-12 right-6 bg-[#dc2626] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-lg font-bold text-xs sm:text-sm">
                          {gal.date}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#dc2626] transition-colors duration-300 pr-16 sm:pr-20 line-clamp-1">
                          {gal.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2">
                          {gal.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-400">
                          {/* VIEW GALLERY BUTTON */}
                          <button
                            className="flex-grow flex items-center justify-start text-xs sm:text-sm font-medium text-gray-400 hover:text-[#dc2626] transition-colors duration-300 bg-transparent cursor-pointer outline-none"
                            onClick={() => setModalEvent({
                              title: gal.title,
                              date: gal.date,
                              location: gal.location || "Jiitech",
                              image: eventImages[0],
                              thumbnails: thumbnails,
                              description: gal.description
                            })}
                            aria-label={`View gallery for ${gal.title}`}
                          >
                            <span>View Gallery ({gal.images.length} photos)</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                          <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600 shrink-0">{gal.academicYear}</span>
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

      {/* Modal renders here */}
      {modalEvent && (
        <GalleryModal event={modalEvent} onClose={() => setModalEvent(null)} />
      )}
    </div>
  );
};

export default AdminGallery;
