import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function PhotoList({ photos, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ Delete this photo?")) return;

    try {
      await axios.delete(`http://localhost:5000/photos/${id}`);
      toast.success("✅ Photo deleted successfully!");
      onDelete && onDelete();
    } catch (err) {
      toast.error("❌ Failed to delete photo");
    }
  };

  // ✅ Open Edit Mode
  const handleEditClick = (photo) => {
    setEditId(photo._id);
    setEditForm({
      title: photo.title,
      imageUrl: photo.imageUrl,
      description: photo.description || "",
    });
  };

  // ✅ Save Updated Photo
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/photos/${id}`, editForm);

      toast.success("✅ Photo updated successfully!");

      setEditId(null);
      onUpdate && onUpdate();
    } catch (err) {
      toast.error("❌ Failed to update photo");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {photos.map((p) => (
        <div key={p._id} className="border p-2 rounded shadow-sm">

          {/* ✅ If Editing */}
          {editId === p._id ? (
            <div className="grid gap-2">
              <input
                className="border p-2"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
              <input
                className="border p-2"
                value={editForm.imageUrl}
                onChange={(e) =>
                  setEditForm({ ...editForm, imageUrl: e.target.value })
                }
              />
              <textarea
                className="border p-2"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
              <div className="flex gap-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleUpdate(p._id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ✅ Normal View */}
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-32 w-full object-cover rounded"
              />
              <p className="font-medium mt-2">{p.title}</p>

              <div className="flex justify-between mt-2">
                <button
                  className="text-blue-600 font-semibold"
                  onClick={() => handleEditClick(p)}
                >
                  Edit
                </button>

                <button
                  className="text-red-600 font-semibold"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

PhotoList.propTypes = {
  photos: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};
