import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-yellow-300 p-6 font-mono">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-4 opacity-10 pointer-events-none">
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-yellow-400"></div>
        <div className="border-4 border-black bg-white"></div>
        <div className="border-4 border-black bg-white col-span-2"></div>
        <div className="border-4 border-black bg-yellow-500"></div>
      </div>
      <header className="mb-12 z-10 text-center flex gap-5 justify-around">
        <h1 className="inline-block bg-white border-8 border-black text-xl md:text-2xl font-black uppercase p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-2">
          The Feed!
        </h1>
        <button 
      onClick={() => navigate('/CreatePost')}
      className="group relative md:text-2xl px-8 py-3 mt-5 font-black uppercase tracking-widest text-[12px]
                 bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75
                 transition-all active:bg-yellow-500 cursor-pointer"
    >
      <span className="relative z-10">Create your post</span>
      {/* Decorative inner line often seen in comic art */}
      <div className="absolute inset-1 border-2 border-black opacity-10 pointer-events-none"></div>
    </button>
      </header>

      <div className="columns-1 z-10 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div 
            key={post._id} 
            className="break-inside-avoid group cursor-pointer z-100"
          >
            <article className="relative bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150">
              
              {/* Image Panel */}
              <div className="border-4 border-black mb-4 flex items-center justify-center overflow-hidden relative bg-gray-200">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.caption} 
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <span className="p-10 font-black opacity-20 uppercase">No Image Found</span>
                )}
                
                {/* Halftone Overlay Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(black_1px,transparent_0)] bg-size-[10px_10px] pointer-events-none"></div>
              </div>

              {/* Caption (Speech Bubble Style) */}
              <div className="relative bg-white border-4 border-black p-4 mt-2">
                {/* Speech bubble tail using standard Tailwind borders */}
                <div className="absolute -top-4 left-6 w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-15 border-b-black"></div>
                <p className="font-black text-lg leading-tight uppercase">
                   {post.caption || "SILENCE IS GOLDEN..."}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center">
                <span className="bg-yellow-400 border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                  #ID_{post._id.slice(-4)}
                </span>
                <button className="text-red-500 text-2xl hover:scale-125 transition-transform">
                  ❤️
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(black_2px,transparent_0)] bg-size-[12px_12px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default Feed;