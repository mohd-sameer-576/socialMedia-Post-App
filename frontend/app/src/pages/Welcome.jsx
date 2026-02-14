import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-yellow-300 font-mono overflow-hidden relative">
      {/* Background Comic Panels (Decorative) */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4 opacity-10 pointer-events-none">
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-yellow-400"></div>
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-white col-span-2"></div>
        <div className="border-4 border-black bg-yellow-500"></div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Main Hero Title */}
        <div className="relative mb-12">
          <h1 className="text-6xl md:text-9xl font-black uppercase text-white tracking-tighter [text-shadow:8px_8px_0px_rgba(0,0,0,1)] -rotate-3 leading-none">
            POW! <br /> <span className="text-black [text-shadow:none]">COMIC</span><span className="text-red-500">FEED</span>
          </h1>
          
          {/* Decorative Action Star */}
          <div className="absolute -top-10 -right-16 w-32 h-32 bg-yellow-400 border-4 border-black rotate-12 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden md:flex">
             <span className="font-black text-2xl uppercase">NEW!</span>
          </div>
        </div>

        {/* Catchphrase / Subtitle */}
        <div className="bg-white border-4 border-black p-4 mb-12 max-w-lg shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-1">
          <p className="text-xl md:text-2xl font-black uppercase leading-tight">
            "The world's first decentralized comic universe where YOUR stories become legend!"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl">
          <button 
            onClick={() => navigate('/signup')}
            className="flex-1 bg-red-500 text-white border-4 border-black py-6 text-3xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Join Now!
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="flex-1 bg-white border-4 border-black py-6 text-3xl font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Log In
          </button>
        </div>

        {/* Footer Text */}
        <div className="mt-16 flex items-center gap-4">
            <div className="h-1 w-20 bg-black"></div>
            <p className="font-black uppercase tracking-widest italic">Issue #001 — Out Now</p>
            <div className="h-1 w-20 bg-black"></div>
        </div>
      </main>

      {/* Halftone Texture Overlay */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(black_2px,transparent_0)] bg-size-[12px_12px] pointer-events-none"></div>
    </div>
  );
};

export default Welcome;