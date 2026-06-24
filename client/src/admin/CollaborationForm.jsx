import { useState } from "react";
import AdminNavbar from "./Navbar";
 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/Api";

function CollaborationForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !date || !description || !image) {
      toast.warning("All fields are required!", { position: "top-center" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);

      await axiosInstance.post("/collaboration", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Collaboration added successfully!", {
        position: "top-center",
      });

      setTitle("");
      setDate("");
      setDescription("");
      setImage(null);

      setTimeout(() => navigate("/collaboration"), 1200);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit collaboration!", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      {/* Main Wrapper */}
      <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-10 py-20 flex justify-center items-start">
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl border-t-4 border-[#dc2626]">

          {/* Page Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#dc2626] mb-6">
            Add Collaboration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block font-semibold text-[#dc2626] mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring focus:ring-[#dc2626]"
                placeholder="Enter collaboration title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block font-semibold text-[#dc2626] mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring focus:ring-[#dc2626]"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-[#dc2626] mb-1">
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 h-32 text-sm sm:text-base focus:outline-none focus:ring focus:ring-[#dc2626]"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold text-[#dc2626] mb-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg p-3 bg-white text-sm sm:text-base"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#dc2626] text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : "Submit Collaboration"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default CollaborationForm;
