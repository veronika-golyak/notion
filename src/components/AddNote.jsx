import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNotes } from './NotesContext'; 

const AddNote = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { addNote } = useNotes(); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({ title: '', content: '' });

  const handleCreateNote = () => {
    let valid = true;
    const newErrors = { title: '', content: '' };

    if (!title.trim()) {
      newErrors.title = 'The note title cannot be empty.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const newNote = {
        id: Date.now(), 
        title,
        content,
        createdAt: Date.now(),
      };

      addNote(newNote); 
      navigate('/notes'); 
    }
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

        <h2 className="text-center text-3xl font-bold mb-4">Add New Note</h2>

        <div className="mb-4">
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Name"
            className={`border p-2 w-full ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Note text..."
            className="border p-2 w-full"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleCreateNote}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
          <Link to="/notes" className="text-black hover:text-blue-600 no-underline">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddNote;