import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/get-posts`);
      
      // Fix: Ensure we are looking at the array, not the wrapper object
      const postsArray = res.data.posts || res.data; 
      
      if (Array.isArray(postsArray)) {
        const post = postsArray.find(p => p._id === id);
        if (post) {
          setCaption(post.caption);
        }
      } else {
        console.error("Data received is not an array:", res.data);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching post details", err);
      setLoading(false);
    }
  };
  fetchPost();
}, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/posts/update-post/${id}`, 
        { caption }, 
        { withCredentials: true }
      );
      navigate('/profile'); // Send them back to profile after update
    } catch (err) {
      alert("Update failed!");
    }
  };

  if (loading) return <div className="p-10 font-black">LOADING PANEL...</div>;

  return (
    <div className="min-h-screen bg-yellow-300 p-10 font-mono flex justify-center items-center">
      <div className="bg-white border-8 border-black p-8 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full">
        <h2 className="text-3xl font-black uppercase mb-6 bg-black text-white inline-block px-2">Edit Panel</h2>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block font-black uppercase mb-2">Change Caption:</label>
            <textarea 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border-4 border-black p-3 font-bold text-lg focus:outline-none focus:bg-yellow-50"
              rows="4"
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="submit"
              className="flex-1 bg-green-400 border-4 border-black py-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Update Panel!
            </button>
            <button 
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 bg-white border-4 border-black py-3 font-black uppercase"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;