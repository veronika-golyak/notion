import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNotes } from './NotesContext';

const Notes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, handleLogout } = useAuth();
  const { notes, deleteNote } = useNotes();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
  };

  const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const isActive = (path) => (location.pathname === path ? 'font-bold' : '');

  return (
    <div className="flex justify-center items-start min-h-screen px-4"> 
      <div className="prose p-6 bg-white rounded w-full max-w-xl"> 
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold">Hello, {userData ? userData.email : 'Guest'}!</p>
          <div>
            <Link to="/dashboard" className={`mr-4 text-black hover:text-blue-600 no-underline ${isActive('/dashboard')}`}>
              About Me
            </Link>
            <Link to="/notes" className={`mr-4 text-black hover:text-blue-600 no-underline ${isActive('/notes')}`}>
              Notes
            </Link>
            <button 
              onClick={handleLogoutClick} 
              className="text-black hover:text-blue-600 focus:outline-none"
            >
              Log Out
            </button>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold mb-4">Your Notes</h2>

        <div className="flex justify-center mb-4">
          <Link to="/add-note" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add new note
          </Link>
        </div>

        {sortedNotes.length > 0 ? (
          <ul className="list-disc pl-6">
            {sortedNotes.map(note => (
              <li key={note.id} className="flex justify-between items-center mb-2">
                <Link to={`/view-note/${note.id}`} className="flex-1 text-black hover:text-blue-600 no-underline">
                  {note.title}
                </Link>
                <span className="text-gray-500 text-sm ml-2">{new Date(note.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center space-x-2">
                  <Link to={`/edit-note/${note.id}`} className="text-black hover:text-blue-600 no-underline">
                    ✍️
                  </Link>
                  <button onClick={() => handleDeleteNote(note.id)} className="text-red-600">
                    🗑
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Notes;