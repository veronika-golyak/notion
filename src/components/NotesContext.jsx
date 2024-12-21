import React, { createContext, useState, useContext } from 'react';

const defaultNote = {
  id: '',
  title: '',
  content: '',
  createdAt: new Date(),
};

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    if (!newNote.id) {
      newNote.id = Date.now().toString(); 
    }
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map(note => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
  };

  const value = { notes, addNote, updateNote, deleteNote };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};

export const useNotes = () => {
  return useContext(NotesContext);
};