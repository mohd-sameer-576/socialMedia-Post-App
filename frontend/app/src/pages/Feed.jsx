import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/posts/get-posts');
        setposts(res.data.posts || res.data);
      } catch (err) {
        console.error("Error fetching comic feed:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="relative min-h-screen bg-yellow-300 p-6 font-mono overflow-x-hidden">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4 opacity-10 pointer-events-none -z-10">
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-yellow-400"></div>
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-white col-span-2"></div>
        <div className="border-4 border-black bg-yellow-500"></div>
      </div>

      {/* FIXED HEADER LAYOUT */}
      <header className="relative z-20 mb-16 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Section: Create Button */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => navigate('/CreatePost')}
            className="group relative px-6 py-3 font-black uppercase tracking-widest text-sm
                     bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:shadow-none hover:translate-x-1 hover:translate-y-1
                     transition-all active:bg-yellow-400 cursor-pointer"
          >
            <span className="relative z-10">Create Post</span>
            <div className="absolute inset-1 border-2 border-black opacity-10 pointer-events-none"></div>
          </button>
        </div>

        {/* Center Section: Title */}
        <div className="flex-shrink-0">
          <h1 className="bg-white border-8 border-black text-2xl md:text-4xl font-black uppercase p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-2">
            The Feed!
          </h1>
        </div>

        {/* Right Section: Logout Button */}
        <div className="flex-1 flex justify-end">
          <div className="rotate-3">
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="break-inside-avoid group cursor-pointer">
            <article className="relative bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150">
              
              {/* Image Panel */}
              <div className="border-4 border-black mb-4 flex items-center justify-center overflow-hidden relative bg-gray-200 aspect-square">
                {post.image ? (
                  <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
                ) : (
                  <span className="p-10 font-black opacity-20 uppercase text-center">No Image Found</span>
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(black_1px,transparent_0)] [background-size:10px_10px] pointer-events-none"></div>
              </div>

              {/* Caption */}
              <div className="relative bg-white border-4 border-black p-4 mt-2">
                <div className="absolute -top-4 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-black"></div>
                <p className="font-black text-lg leading-tight uppercase">
                  {post.caption || "SILENCE IS GOLDEN..."}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center">
                <span className="bg-yellow-400 border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                  #ID_{post._id.slice(-4)}
                </span>
                <button className="text-2xl hover:scale-125 transition-transform">❤️</button>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Halftone Texture Overlay */}
      <div className="fixed inset-0 opacity-10 bg-[radial-gradient(black_2px,transparent_0)] [background-size:12px_12px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default Feed;