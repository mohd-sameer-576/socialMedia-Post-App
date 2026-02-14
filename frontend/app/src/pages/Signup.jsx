import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up:", formData);
    axios.post("http://localhost:3000/api/auth/register-user",{
        username : formData.username,
        email : formData.email,
        password : formData.password
    },{
        withCredentials:true
    })
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-6 font-mono">
      <div className="max-w-md w-full">
        {/* Comic Header */}
        <div className="text-center mb-10">
          <h1 className="inline-block bg-white border-8 border-black text-3xl font-black uppercase p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-2">
            Join the Squad!
          </h1>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-black uppercase mb-1 text-sm">Codename (Username)</label>
              <input 
                type="text" 
                className="w-full border-4 border-black p-3 font-bold focus:ring-4 ring-yellow-400/50 outline-none"
                placeholder="CAPTAIN_REACT"
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            <div>
              <label className="block font-black uppercase mb-1 text-sm">Email</label>
              <input 
                type="email" 
                className="w-full border-4 border-black p-3 font-bold focus:ring-4 ring-yellow-400/50 outline-none"
                placeholder="HERO@BASE.COM"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block font-black uppercase mb-1 text-sm">Password</label>
              <input 
                type="password" 
                className="w-full border-4 border-black p-3 font-bold focus:ring-4 ring-yellow-400/50 outline-none"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="relative bg-black text-white p-3 mb-6 text-xs font-bold uppercase">
              <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-black"></div>
              Must be at least 8 characters of pure power!
            </div>

            <button 
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-yellow-400 border-4 border-black py-4 font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Assemble!
            </button>
          </form>
        </div>

        <p className="mt-8 text-center font-black uppercase italic">
          Already a member? <Link to="/login" className="underline decoration-4 hover:bg-white px-1">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;