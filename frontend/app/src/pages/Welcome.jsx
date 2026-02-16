import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-yellow-300 font-mono overflow-x-hidden relative">
      {/* Background Comic Panels (Decorative) */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 p-4 opacity-10 pointer-events-none">
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-yellow-400"></div>
        <div className="hidden md:block border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-white col-span-2"></div>
        <div className="hidden md:block border-4 border-black bg-yellow-500"></div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-6 text-center">
        {/* Main Hero Title */}
        <div className="relative mb-8 md:mb-12">
          {/* Adjusted font sizes for mobile (text-5xl) vs desktop (text-9xl) */}
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase text-white tracking-tighter [text-shadow:4px_4px_0px_rgba(0,0,0,1)] md:[text-shadow:8px_8px_0px_rgba(0,0,0,1)] -rotate-3 leading-[0.9]">
            POW! <br /> 
            <span className="text-black text-shadow-none">ARTIST</span>
            <span className="text-red-500">NETWORK</span>
          </h1>
          
          {/* Decorative Action Star - Responsive positioning */}
          <div className="absolute -top-10 -right-4 md:-top-10 md:-right-16 w-20 h-20 md:w-32 md:h-32 bg-yellow-400 border-4 border-black rotate-12 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             <span className="font-black text-sm md:text-2xl uppercase">NEW!</span>
          </div>
        </div>

        {/* Catchphrase / Subtitle */}
        <div className="bg-white border-4 border-black p-4 mb-10 md:mb-12 w-full max-w-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rotate-1">
          <p className="text-base md:text-2xl font-black uppercase leading-tight">
            "THE ULTIMATE SPACE FOR CREATORS TO SKETCH, CONNECT, AND BUILD THE NEXT GREAT COMIC EMPIRE."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-md md:max-w-2xl px-2">
          <button 
            onClick={() => navigate('/signup')}
            className="flex-1 bg-red-500 text-white border-4 border-black py-4 md:py-6 text-xl md:text-3xl font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer active:bg-red-600"
          >
            Join Now!
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="flex-1 bg-white border-4 border-black py-4 md:py-6 text-xl md:text-3xl font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer active:bg-gray-100"
          >
            LOG IN
          </button>
        </div>

        {/* Footer Text - Responsive lines */}
        <div className="mt-12 md:mt-16 flex items-center gap-2 md:gap-4">
            <div className="h-1 w-10 md:w-20 bg-black"></div>
            <p className="font-black text-[10px] md:text-sm uppercase tracking-widest italic">CREATOR HUB #001 — ONLINE NOW </p>
            <div className="h-1 w-10 md:w-20 bg-black"></div>
        </div>
      </main>

      {/* Halftone Texture Overlay */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(black_2px,transparent_0)] [background-size:12px_12px] pointer-events-none"></div>
    </div>
  );
};

export default Welcome;