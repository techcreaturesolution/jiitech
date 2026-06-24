import { useState } from "react";
import AdminNavbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/Api";
import { useNavigate } from "react-router-dom";

const OpportunityForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastDate: "",
    season: "",
    applyLink: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ------------------------------
  // VALIDATION FUNCTION
  // ------------------------------
  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required!");
      return false;
    }
    if (formData.title.length < 5) {
      toast.error("Title must be at least 5 characters!");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required!");
      return false;
    }
    if (formData.description.length < 20) {
      toast.error("Description must be at least 20 characters!");
      return false;
    }
    if (!formData.lastDate) {
      toast.error("Please select the last date!");
      return false;
    }

    const today = new Date().toISOString().split("T")[0];
    if (formData.lastDate < today) {
      toast.error("Last date cannot be in the past!");
      return false;
    }

    if (!formData.season) {
      toast.error("Please select a season!");
      return false;
    }

    if (!formData.applyLink.trim()) {
      toast.error("Apply link is required!");
      return false;
    }
    if (!formData.applyLink.startsWith("http")) {
      toast.error("Apply link must be a valid URL (must start with http or https)");
      return false;
    }

    if (!image) {
      toast.error("Please upload an image!");
      return false;
    }

    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("lastDate", formData.lastDate);
      data.append("season", formData.season);
      data.append("applyLink", formData.applyLink);
      if (image) data.append("image", image);

      await axiosInstance.post("/opportunities", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Opportunity created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        lastDate: "",
        season: "",
        applyLink: "",
      });
      setImage(null);
      setImagePreview(null);

      // Redirect to Opportunities page
      setTimeout(() => {
        navigate("/opportunities");
      }, 1000);

    } catch (error) {
      toast.error("Error creating opportunity");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <AdminNavbar />

      <ToastContainer />

      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-3xl mx-auto">

        <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-600 mb-6">
            Add New Opportunity
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="text-sm font-semibold">Title</label>
              <input
                type="text"
                name="title"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-red-400"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold">Description</label>
              <textarea
                name="description"
                rows="4"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-red-400"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Last Date */}
            <div>
              <label className="text-sm font-semibold">Last Date</label>
              <input
                type="date"
                name="lastDate"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-red-400"
                value={formData.lastDate}
                onChange={handleChange}
              />
            </div>

            {/* Season */}
            <div>
              <label className="text-sm font-semibold">Season</label>
              <select
                name="season"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-red-400"
                value={formData.season}
                onChange={handleChange}
              >
                <option value="">Select Season</option>
                <option value="Spring 2025">Spring 2025</option>
                <option value="Fall 2025">Fall 2025</option>
                <option value="Winter 2025">Winter 2025</option>
                <option value="Spring 2026">Spring 2026</option>
              </select>
            </div>

            {/* Apply Link */}
            <div>
              <label className="text-sm font-semibold">Apply Link</label>
              <input
                type="url"
                name="applyLink"
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-red-400"
                value={formData.applyLink}
                onChange={handleChange}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-semibold">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full mt-1"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-40 h-40 object-cover rounded-md mt-4 border"
                  alt="Preview"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Create Opportunity"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OpportunityForm;
