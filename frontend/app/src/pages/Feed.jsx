import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
const Feed = () => {
    const [posts, setposts] = useState([
        {
            _id:"1",
            image:"https://ik.imagekit.io/rwluxxgzs/image_Zlb8YZ9s7.jpg",
            caption:"Sameer"
        }
    ])
    
    useEffect(() => {
      axios.get('http://localhost:3000/posts')
      .then((res)=>{
        console.log(res.data)
      })
    
     
    }, )
    
  return (
    <div className="min-h-screen bg-yellow-300 p-6 font-mono">
      {/* Page Header */}
      <header className="mb-12 text-center">
        <h1 className="inline-block bg-white border-8 border-black text-5xl md:text-7xl font-black uppercase p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-2">
          The Feed!
        </h1>
      </header>

      {/* Comic Grid (Masonry style) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="break-inside-avoid group cursor-pointer"
          >
            <article className="relative bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150">
              
              {/* Image Placeholder / Panel */}
              <div className={`${post.color} ${post.size} border-4 border-black mb-4 flex items-center justify-center overflow-hidden relative`}>
                <span className="text-white font-black text-4xl opacity-50 uppercase italic tracking-tighter">
                  Visual
                </span>
                {/* Halftone Overlay Effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(black_1px,transparent_0)] bg-size-[10px_10px]"></div>
              </div>

              {/* Caption (Speech Bubble Style) */}
              <div className="relative bg-white border-4 border-black p-4 mt-2">
                <div className="absolute -top-4 left-6 w-0 h-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-b-15 border-b-black"></div>
                <p className="font-black text-lg leading-tight uppercase">
                   {post.caption}
                </p>
              </div>

              {/* Footer / Meta */}
              <div className="mt-4 flex justify-between items-center">
                <span className="bg-yellow-400 border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                  #Issue_{post.id}
                </span>
                <button className="text-red-500 hover:scale-125 transition-transform">
                  ❤️
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed