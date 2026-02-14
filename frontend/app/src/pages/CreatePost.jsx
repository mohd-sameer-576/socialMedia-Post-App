import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const handleSubmit = async (e)=>{
        e.preventDefault()
         if (!image) {
    alert("Please select an image");
    return;
  }
        const formData = new FormData()
        formData.append("image", image);
  formData.append("caption", caption);

        axios.post("http://localhost:3000/api/posts/create-post", formData,{
          withCredentials: true
        })
        setCaption('')
        setImage(null);
        e.target.reset();
    }
  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center p-4 font-mono">
      <form 
        className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full transform -rotate-1"
        onSubmit={handleSubmit}
      >
      
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black inline-block">
          Add New Post!
        </h2>

        {/* File Input Group */}
        <div className="mb-6">
          <label className="block text-lg font-bold uppercase mb-2">
            Select Image
          </label>
          <input 
          name='image'
            type="file" 
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border-4 border-black p-2 bg-blue-100 cursor-pointer 
                       file:mr-4 file:py-2 file:px-4 file:border-0
                       file:text-sm file:font-black file:uppercase
                       file:bg-yellow-400 file:text-black
                       hover:file:bg-yellow-500 transition-colors"
          />
        </div>

        {/* Caption Input Group */}
        <div className="mb-6">
          <label className="block text-lg font-bold uppercase mb-2">
            Caption
          </label>
          <textarea
          name='caption'
          value={caption}
          onChange={(e)=>setCaption(e.target.value)}
            placeholder="KRAAAK! POW! Write something..."
            className="w-full border-4 border-black p-3 focus:outline-none focus:bg-pink-50 placeholder-gray-500 font-bold"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full bg-red-500 text-white border-4 border-black py-3 px-6 
                     font-black uppercase text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                     hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none 
                     active:bg-red-600 transition-all"
        >
          Create
        </button>
      </form>
      <button 
      onClick={() => navigate('/feed')}
      className="group relative px-8 py-3 mt-5 font-black uppercase tracking-widest text-xl
                 bg-yellow-400 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]
                 transition-all active:bg-yellow-500 cursor-pointer"
    >
      <span className="relative z-10">Go to Feed!</span>
      {/* Decorative inner line often seen in comic art */}
      <div className="absolute inset-1 border-2 border-black opacity-10 pointer-events-none"></div>
    </button>
    </div>
  )
}

export default CreatePost