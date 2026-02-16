import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setposts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from local storage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/get-posts`);
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
     <header className="relative z-20 mb-10 max-w-7xl mx-auto px-2">
  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
    
    {/* Left Section: Create Button (Top on mobile) */}
    <div className="order-2 md:order-1 flex-1 flex justify-center md:justify-start w-full md:w-auto">
      <button
        onClick={() => navigate('/CreatePost')}
        className="group relative w-full md:w-auto px-6 py-3 font-black uppercase tracking-widest text-sm
                   bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-none hover:translate-x-1 hover:translate-y-1
                   transition-all active:bg-yellow-400 cursor-pointer"
      >
        <span className="relative z-10">Create Post</span>
        <div className="absolute inset-1 border-2 border-black opacity-10 pointer-events-none"></div>
      </button>
    </div>

    {/* Center Section: Title (Always stays bold) */}
    <div className="order-1 md:order-2 flex-shrink-0">
      <h1 className="bg-white border-8 border-black text-3xl md:text-4xl font-black uppercase p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-2">
        The Feed!
      </h1>
    </div>

    {/* Right Section: Profile Button (Bottom on mobile) */}
    <div className="order-3 md:order-3 flex-1 flex justify-center md:justify-end w-full md:w-auto">
      <button
        onClick={() => navigate('/profile')}
        className="group relative w-full md:w-auto px-6 py-3 font-black uppercase tracking-widest text-sm
                   bg-cyan-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-none hover:translate-x-1 hover:translate-y-1
                   transition-all active:bg-cyan-500 cursor-pointer"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          My Profile <span className="text-xl">👤</span>
        </span>
      </button>
    </div>
    
  </div>
</header>

      {/* Main Content Area */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div 
            key={post._id} 
            className="group cursor-pointer"
            onClick={() => setSelectedPost(post)} // Open Modal
          >
            <article className="relative bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150 h-full flex flex-col">
              
              {/* User Header */}
              <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
                <div className="w-8 h-8 bg-red-500 border-2 border-black flex items-center justify-center text-white font-black text-xs">
                  {currentUser?.username?.charAt(0).toUpperCase() || "A"}
                </div>
                <span className="font-black text-sm uppercase">{post.author?.username || "Unknown Artist"}</span>
              </div>

              {/* Image Panel */}
              <div className="border-4 border-black mb-4 flex items-center justify-center overflow-hidden relative bg-gray-200 aspect-square shrink-0">
                {post.image ? (
                  <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
                ) : (
                  <span className="p-10 font-black opacity-20 uppercase text-center">No Image Found</span>
                )}
              </div>

              {/* Caption Section */}
              <div className="grow">
                 <p className="font-black text-lg leading-tight uppercase line-clamp-2">
                   {post.caption || "SILENCE IS GOLDEN..."}
                 </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center pt-2 border-t-2 border-black">
                <span className="bg-yellow-400 border-2 border-black px-2 py-1 text-[10px] font-bold uppercase">
                  #ID_{post._id.slice(-4)}
                </span>
                
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* MODAL (The "Instagram" Big View) */}
      {selectedPost && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    onClick={() => setSelectedPost(null)} 
  >
    {/* Container with max-height and scrolling */}
    <div 
      className="relative bg-white border-8 border-black p-4 max-w-2xl w-full my-auto shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] flex flex-col"
      onClick={(e) => e.stopPropagation()} 
    >
      {/* Close Button - Moved slightly for better mobile thumb reach */}
      <button 
        className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-red-500 text-white border-4 border-black w-10 h-10 md:w-12 md:h-12 font-black text-xl md:text-2xl hover:bg-black transition-colors z-20"
        onClick={() => setSelectedPost(null)}
      >
        X
      </button>

      {/* Internal Scrollable Content */}
      <div className="overflow-y-auto pr-2 custom-scrollbar">
        {/* User Info Header */}
        <div className="flex items-center gap-3 mb-4 sticky top-0 bg-white py-2 z-10 border-b-2 border-black/10">
           <div className="w-10 h-10 bg-cyan-400 border-4 border-black flex items-center justify-center font-black shrink-0">
             {selectedPost.author?.username?.charAt(0).toUpperCase() || currentUser?.username?.charAt(0).toUpperCase()}
           </div>
           <span className="font-black text-xl uppercase italic truncate">
             {selectedPost.author?.username || currentUser?.username}
           </span>
        </div>

        {/* Post Image */}
        <div className="border-4 border-black mb-4 bg-gray-100">
          <img 
            src={selectedPost.image} 
            alt={selectedPost.caption} 
            className="w-full h-auto block" 
          />
        </div>
        
        {/* Caption Area */}
        <div className="bg-black text-white p-6 relative">
          {/* Comic Tail Decoration */}
          <div className="absolute -top-4 left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-black"></div>
          <p className="font-bold text-lg md:text-xl uppercase leading-tight">
            {selectedPost.caption}
          </p>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Halftone Texture Overlay */}
      <div className="fixed inset-0 opacity-10 bg-[radial-gradient(black_2px,transparent_0)] [background-size:12px_12px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default Feed;