import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login-user",
      {
        email: formData.email,
        password: formData.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
if (res.data.user) {
  // Save the user object as a string in localStorage
  localStorage.setItem('user', JSON.stringify(res.data.user));
  navigate('/feed');
}
    console.log(res.data); 
    navigate("/feed");

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
  }
};

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-6 font-mono">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4 opacity-10 pointer-events-none">
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-yellow-400"></div>
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-white col-span-2"></div>
        <div className="border-4 border-black bg-yellow-500"></div>
      </div>
      <div className="max-w-md z-10 w-full">
        {/* Comic Header */}
        <div className="text-center mb-10">
          <h1 className="inline-block bg-white border-8 border-black text-3xl font-black uppercase p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-2">
            Welcome Back!
          </h1>
        </div>

        {/* Form Card */}
        <form 
          onSubmit={handleSubmit}
          className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative"
        >
          {/* Halftone Overlay Effect */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(black_1px,transparent_0)] [background-size:8px_8px] pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block font-black uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                name='email'
                required
                className="w-full border-4 border-black p-3 font-bold focus:bg-yellow-100 outline-none transition-colors"
                placeholder="HERO@EXAMPLE.COM"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block font-black uppercase mb-2">Secret Password</label>
              <input 
                type="password" 
                name='password'
                required
                className="w-full border-4 border-black p-3 font-bold focus:bg-yellow-100 outline-none transition-colors"
                placeholder="********"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-yellow-400 border-4 border-black py-4 font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:bg-yellow-500"
            >
              Enter the Multiverse
            </button>
          </div>
        </form>

        <p className="mt-8 text-center font-black uppercase italic">
          New hero? <Link to="/signup" className="underline decoration-4 hover:bg-white px-1">Create an account</Link>
        </p>
      </div>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(black_2px,transparent_0)] bg-size-[12px_12px] pointer-events-none"></div>
    </div>
  );
};

export default Login;