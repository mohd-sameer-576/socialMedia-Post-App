import React, { useState } from 'react';

const CreatePost = () => {
    const [caption, setCaption] = useState('');
  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4 font-mono">
      <form 
        className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full transform -rotate-1"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Header */}
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black inline-block">
          Add New Post!
        </h2>

        {/* File Input Group */}
        <div className="mb-6">
          <label className="block text-lg font-bold uppercase mb-2">
            Select Image
          </label>
          <input 
            type="file" 
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
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
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
    </div>
  )
}

export default CreatePost