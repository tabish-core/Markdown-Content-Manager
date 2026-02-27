import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteModal from "./NoteModal";
import { useLocation } from "react-router-dom";

const Home = () => {

  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const location = useLocation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }


  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";
      const { data } = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredNotes = search
        ? data.filter(
          (note) =>
            note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.description.toLowerCase().includes(search.toLowerCase())
        )
        : data;
      setNotes(filteredNotes);
      console.log(data);
    } catch (err) {
      setError("Failed to fetch notes");
    }
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchNotes();
  }, [location.search]);
  const handleSaveNote = (newNote) => {
    if (editNote) {
      setNotes(
        notes.map((note) => (note._id === newNote._id ? newNote : note))
      );
    } else {
      setNotes([...notes, newNote]);
    }

    setEditNote(null);
    setIsModalOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }
      await axios.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      setError("Failed to delete note");
    }

  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2C2C2C] selection:bg-[#EAE0D5]">
      <div className="container mx-auto px-6 py-12">

        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">My Workspace</h1>
            <p className="text-[#726D6A] text-sm mt-1">Organize your thoughts in markdown.</p>
          </div>
          {error && <p className="text-red-500 text-sm animate-pulse">{error}</p>}
        </div>

        <NoteModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditNote(null); }}
          note={editNote}
          onSave={handleSaveNote}
        />

        {/* Floating Action Button - Modernized */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-[#2C2C2C] text-[#FDFCF8] rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center z-50 group"
        >
          <span className="text-3xl font-light group-hover:rotate-90 transition-transform duration-300">+</span>
        </button>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <div
              key={note._id}
              className="group bg-white border border-[#EAE0D5] p-6 rounded-[24px] hover:shadow-lg hover:border-[#D6CCC2] transition-all duration-300 flex flex-col h-64"
            >
              <div className="flex-1">

                <h3 className="text-xl font-medium text-[#2C2C2C] mb-3 group-hover:opacity-80 transition-opacity">
                  {note.title}
                </h3>
                <p className="text-[#5E5E5E] line-clamp-3 text-sm leading-relaxed">
                  {note.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-bold">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>

                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-sm font-semibold text-[#726D6A] hover:text-[#1A1A1A]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-sm font-semibold text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  //   <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-500">
  //     {error && <p className="text-red-400 mb-4">{error}</p>}
  //     <NoteModal
  //       isOpen={isModalOpen}
  //       onClose={() => {
  //         setIsModalOpen(false);
  //         setEditNote(null);
  //       }}
  //       note={editNote}
  //       onSave={handleSaveNote}
  //     />
  //     <button
  //       onClick={() => setIsModalOpen(true)}
  //       className="fixed bottom-6 right-6 w-14 h-14 bg-gray-800 text-white text-3xl rounded-full shadow-lg hover:bg-gray-900 flex items-center justify-center"
  //     >
  //       <span className="flex items-center justify-center h-full w-full pb-1">
  //         +
  //       </span>
  //     </button>
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //       {notes.map((note) => (
  //         <div className="bg-gray-800 p-4 rounded-lg shadow-md" key={note._id}>
  //           <h3 className="text-lg font-medium text-white mb-2">
  //             {note.title}
  //           </h3>
  //           <p className="text-gray-300 mb-4">{note.description}</p>
  //           <p className="text-sm text-gray-400 mb-4">
  //             {new Date(note.updatedAt).toLocaleString()}
  //           </p>
  //           <div className="flex space-x-2">
  //             <button
  //               onClick={() => handleEdit(note)}
  //               className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
  //             >
  //               Edit
  //             </button>
  //             <button
  //               onClick={() => handleDelete(note._id)}
  //               className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
  //             >
  //               Delete
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>

};

export default Home;