import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNotes } from './NotesContext';

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { notes, deleteNote } = useNotes();

  const note = notes.find(note => note.id === parseInt(id));

  if (!note) {
    return <p className="text-center">Note not found.</p>;
  }

  const handleDeleteNote = () => {
    deleteNote(note.id); 
    navigate('/notes'); 
  };

  return (
    <div className="flex justify-center items-start min-h-screen px-4">
      <div className="prose p-6 bg-white rounded w-full max-w-xl"> 
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold">Hello, {userData ? userData.email : 'Guest'}!</p>
          <div>
            <Link to="/dashboard" className="mr-4 text-black hover:text-blue-600 no-underline">
              About Me
            </Link>
            <Link to="/notes" className="mr-4 text-black hover:text-blue-600 no-underline">
              Notes
            </Link>
            <Link to="/login" className="text-black hover:text-blue-600 no-underline">
              Log Out
            </Link>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">{note.title}</h2> 

        <pre className="bg-white border text-black p-4">{note.content}</pre> 

        <div className="flex justify-between mb-4">
          <Link to="/notes" className="text-black hover:text-blue-600 no-underline">
            Back to Notes
          </Link>
          <div>
            <Link to={`/edit-note/${note.id}`} className="text-black hover:text-blue-600 no-underline ml-2">
              ✍️
            </Link>
            <button onClick={handleDeleteNote} className="text-red-600 ml-2">
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;