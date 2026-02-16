import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const Profile = () => {
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/my-posts`,
          { withCredentials: true },
        );
        setMyPosts(res.data.posts || res.data);

        // GET USER FROM LOCAL STORAGE
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error("Error fetching your posts:", err);
      }
    };
    fetchMyPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("DELETE THIS PANEL? FOREVER?!")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/posts/delete-post/${id}`,
          { withCredentials: true },
        );
        setMyPosts(myPosts.filter((post) => post._id !== id));
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-cyan-100 p-6 font-mono">
      <div className="fixed inset-0 opacity-10 bg-[radial-gradient(black_2px,transparent_0)] [background-size:12px_12px] pointer-events-none -z-10"></div>

      {/* HEADER */}
      <header className="relative z-20 mb-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between w-full py-4">
          {/* Back Button */}
          <button
            onClick={() => navigate("/feed")}
            className="font-black uppercase border-b-4 border-black hover:bg-black hover:text-white transition-all px-2 text-sm md:text-base whitespace-nowrap"
          >
            ← <span className=" xs:inline">Back to</span> Feed
          </button>

          {/* Logout Button */}
          <div className="shrink-0 scale-90 md:scale-100 origin-right">
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* NEW: USER DETAILS HERO SECTION */}
      <section className="max-w-7xl mx-auto mb-12">
        <div className="bg-white border-8 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Decorative Badge */}
          <div className="absolute top-4 -right-12 bg-yellow-400 border-y-4 border-black w-48 text-center rotate-45 font-black text-xs uppercase">
            Artist Pro
          </div>

          {/* Avatar Icon */}
          <div className="w-32 h-32 bg-red-500 border-4 border-black flex items-center justify-center text-6xl text-white font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-3">
            {user?.username ? user.username.charAt(0).toUpperCase() : "!"}
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black uppercase mb-1 tracking-tighter italic">
              {user?.username || "Identity Unknown"}
            </h1>
            <p className="bg-black text-white inline-block px-3 py-1 font-bold text-sm mb-4">
              {user?.email || "Email Classified"}
            </p>

            <div className="flex gap-4">
              <div className="bg-cyan-300 border-4 border-black px-4 py-1 font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                PANELS: {myPosts.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      {/* GRID SECTION */}
      <h2 className="max-w-7xl mx-auto text-2xl font-black uppercase mb-6 italic underline">
        My Sketchbook —
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        {myPosts.map((post) => (
          <article
            key={post._id}
            className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[450px]"
          >
            {/* FIXED SIZE IMAGE CONTAINER */}
            <div className="border-4 border-black mb-4 h-64 w-full overflow-hidden bg-gray-200 shrink-0">
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CAPTION - Fixed height to keep buttons aligned */}
            <div className="flex-grow">
              <p className="font-black uppercase mb-2 line-clamp-2 leading-tight">
                {post.caption}
              </p>
            </div>

            {/* BUTTONS - Always pushed to the bottom */}
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => navigate(`/update-post/${post._id}`)}
                className="flex-1 bg-yellow-400 border-2 border-black font-extrabold py-2 hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                EDIT
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="flex-1 bg-red-500 border-2 border-black font-extrabold py-2 text-white hover:bg-white hover:text-red-500 transition-all cursor-pointer"
              >
                ERASE
              </button>
            </div>
          </article>
        ))}
      </div>

      {myPosts.length === 0 && (
        <div className="text-center mt-20">
          <h2 className="text-4xl font-black uppercase">
            Your sketchbook is empty!
          </h2>
          <button
            onClick={() => navigate("/CreatePost")}
            className="mt-4 underline font-bold"
          >
            Start drawing now →
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
