import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSchema } from '../validations/userSchema'; 
import ErrorMessages from './ErrorMessages'; 
import { z } from 'zod';
import { useAuth } from './AuthContext'; 

const SignUpForm = () => {
  const navigate = useNavigate();
  const { handleUserRegistration } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    try {
      UserSchema.parse({ email, password, confirmPassword });
      setErrors(null);
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      const userId = Date.now(); 
      const registrationDate = Date.now();
      
      const userData = {
        email,
        password, 
        userId,
        registrationDate,
      };
      
      handleUserRegistration(userData);
      navigate('/dashboard'); 
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => err.message);
        const uniqueErrors = Array.from(new Set(errorMessages));
        setErrors(uniqueErrors.join(' • '));
      } else {
        setErrors(error.message); 
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 rounded w-full max-w-sm bg-white shadow">
        <h1 className="text-2xl mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 mb-4 w-full placeholder-gray-400"
            placeholder="Email"
            required 
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full placeholder-gray-400"
            placeholder="Password"
            required 
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="border p-2 mb-4 w-full placeholder-gray-400"
            placeholder="Confirm Password"
            required 
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded w-2/3 mx-auto block"
          >
            Sign Up
          </button>
        </form>
        {errors && <ErrorMessages errors={errors} />}
      </div>
    </div>
  );
};

export default SignUpForm;
