import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Notes from './components/Notes';
import { AuthProvider } from './components/AuthContext'; 
import { NotesProvider } from './components/NotesContext';
import ViewNote from './components/ViewNote';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <NotesProvider>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/view-note/:id" element={<ViewNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </NotesProvider>
    </AuthProvider>
  );
};

export default App;