import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
  // 1. Initialize with an empty array so .map doesn't fail on an empty object
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/posts');
        // Check if your API returns { posts: [...] } or just [...]
        setposts(res.data.posts || res.data); 
      } catch (err) {
        console.error("Error fetching comic feed:", err);
      }
    };

    fetchPosts();
    
    // 2. THE FIX: The empty dependency array [] ensures this runs ONLY ONCE
  }, []); 

  return (
    <div className="min-h-screen bg-yellow-300 p-6 font-mono">
      <header className="mb-12 text-center">
        <h1 className="inline-block bg-white border-8 border-black text-5xl md:text-7xl font-black uppercase p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-2">
          The Feed!
        </h1>
      </header>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div 
            key={post._id} // 3. Use _id from your MongoDB/Backend
            className="break-inside-avoid group cursor-pointer"
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
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(black_1px,transparent_0)] [background-size:10px_10px] pointer-events-none"></div>
              </div>

              {/* Caption (Speech Bubble Style) */}
              <div className="relative bg-white border-4 border-black p-4 mt-2">
                {/* Speech bubble tail using standard Tailwind borders */}
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
                <button className="text-red-500 text-2xl hover:scale-125 transition-transform">
                  ❤️
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;