import React, { useEffect, useState } from "react";
import axios from "axios";

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note ? note.title : "");
    setDescription(note ? note.description : "");
    setError("");
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }

      const payload = { title, description };
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (note) {
        const { data } = await axios.put(
          `/api/notes/${note._id}`,
          payload,
          config
        );
        onSave(data);
      } else {
        const { data } = await axios.post("/api/notes", payload, config);
        onSave(data);
      }
      setTitle("");
      setDescription("");
      setError("");
      onClose();
    } catch (err) {
      console.log("Note save error");
      setError("Failed to save error");
    }
  };
  // NoteModal.jsx
if (!isOpen) return null;
return (
  <div className="fixed inset-0 bg-[#2C2C2C]/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
    <div className="bg-[#FDFCF8] p-8 rounded-[32px] shadow-2xl w-full max-w-lg border border-[#EAE0D5]">
      <h2 className="text-2xl font-semibold text-[#2C2C2C] mb-6">
        {note ? "Refine Note" : "New Thought"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-0 py-2 bg-transparent text-[#2C2C2C] border-b border-[#EAE0D5] outline-none focus:border-[#2C2C2C] transition-colors text-lg font-medium placeholder:text-[#A8A29E]"
          required
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Start writing..."
          className="w-full px-0 py-2 bg-transparent text-[#726D6A] outline-none resize-none min-h-[200px] leading-relaxed placeholder:text-[#A8A29E]"
          required
        />

        <div className="flex pt-4 space-x-3">
          <button
            type="submit"
            className="flex-1 bg-[#2C2C2C] text-[#FDFCF8] py-3 rounded-full font-semibold hover:bg-[#404040] transition-all"
          >
            {note ? "Save Changes" : "Create Note"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full font-semibold text-[#726D6A] hover:bg-[#F5F2ED] transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default NoteModal;