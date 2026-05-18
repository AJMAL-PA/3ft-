import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-32 px-margin-mobile md:px-margin-desktop border-t border-primary/20">
      <div className="max-w-7xl mx-auto">
        
        {/* Large Heading */}
        <h1 className="font-headline-lg text-[60px] md:text-[120px] leading-none uppercase mb-20 tracking-tighter text-primary text-center lg:text-left">
          CONTAct
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Minimal Form */}
          <div className="space-y-12">
            <form className="space-y-12">
              <div className="relative group">
                <label className="block font-label-caps text-[10px] tracking-widest text-primary/60 mb-1 uppercase font-bold">Full name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-primary/20 py-4 focus:outline-none focus:border-primary font-label-caps tracking-widest transition-all"
                  placeholder="ENTER YOUR NAME"
                />
              </div>
              
              <div className="relative group">
                <label className="block font-label-caps text-[10px] tracking-widest text-primary/60 mb-1 uppercase font-bold">Email address</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-primary/20 py-4 focus:outline-none focus:border-primary font-label-caps tracking-widest transition-all"
                  placeholder="NAME@EXAMPLE.COM"
                />
              </div>

              <div className="relative group">
                <label className="block font-label-caps text-[10px] tracking-widest text-primary/60 mb-1 uppercase font-bold">Messages</label>
                <textarea 
                  rows="4"
                  className="w-full bg-transparent border-b border-primary/20 py-4 focus:outline-none focus:border-primary font-body-base transition-all resize-none"
                  placeholder="HOW CAN WE HELP?"
                ></textarea>
              </div>

              <button className="bg-primary text-surface px-10 py-3.5 rounded-full font-label-caps text-xs tracking-widest font-bold hover:bg-[#9a2a2a] transition-colors duration-300 shadow-lg">
                SUBMIT
              </button>
            </form>
          </div>

          {/* Right Column: Floating Contact Card with Cream background */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-background rounded-[40px] shadow-2xl overflow-hidden border border-primary/5">
              
              {/* Card Header (Kept Black for contrast) */}
              <div className="bg-[#0b0b0b] p-10 text-center space-y-2">
                <div className="flex justify-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#9a2a2a] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[#9a2a2a] rounded-full opacity-50"></div>
                  <div className="w-1.5 h-1.5 bg-[#9a2a2a] rounded-full opacity-20"></div>
                </div>
                <h3 className="text-white font-label-caps text-sm tracking-widest font-bold uppercase">Get in touch with us!</h3>
                <p className="text-white/60 font-body-base text-xs uppercase tracking-widest">Lets talk!</p>
              </div>

              {/* Card Body (Cream background) */}
              <div className="p-10 space-y-6">
                
                {/* Email Item */}
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary/40 tracking-widest uppercase">Email</span>
                    <span className="font-label-caps text-xs tracking-widest font-bold text-primary">INFO@3FTARCHIVES.COM</span>
                  </div>
                </div>

                {/* Call Item */}
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary/40 tracking-widest uppercase">Phone</span>
                    <span className="font-label-caps text-xs tracking-widest font-bold text-primary">+1 234 567 890</span>
                  </div>
                </div>

                {/* WhatsApp Item */}
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.511.895 2.994 1.348 4.745 1.349 5.304 0 9.619-4.315 9.622-9.619.001-2.569-1.002-4.985-2.822-6.806-1.82-1.821-4.237-2.826-6.81-2.827-5.31 0-9.624 4.314-9.628 9.618-.001 1.884.542 3.398 1.573 4.887l-.986 3.593 3.689-.968.617.373zm11.231-3.149c-.274-.136-1.62-.8-1.87-.891-.25-.09-.431-.136-.613.136-.182.273-.704.891-.863 1.072-.159.182-.318.204-.591.068-.272-.137-1.152-.424-2.193-1.355-.811-.723-1.358-1.617-1.517-1.891-.159-.272-.017-.42.12-.556.122-.122.273-.318.409-.477.136-.159.182-.272.272-.454.09-.181.045-.341-.022-.477-.068-.136-.613-1.477-.84-2.023-.222-.536-.445-.463-.613-.472l-.523-.009c-.182 0-.477.068-.727.341-.249.273-.954.932-.954 2.273 0 1.341.977 2.636 1.114 2.818.136.182 1.921 2.934 4.654 4.114.65.281 1.157.448 1.553.573.652.208 1.246.179 1.715.109.523-.078 1.62-.663 1.848-1.303.227-.641.227-1.182.159-1.302-.068-.12-.25-.182-.523-.318z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary/40 tracking-widest uppercase">WhatsApp</span>
                    <span className="font-label-caps text-xs tracking-widest font-bold text-primary">SEND A MESSAGE</span>
                  </div>
                </div>

                {/* Instagram Item */}
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.42.679.819.896 1.377.163.422.358 1.057.412 2.227.059 1.265.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.42.419-.819.679-1.377.896-.422.163-1.057.358-2.227.412-1.265.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.819-.896-1.377-.163-.422-.358-1.057-.412-2.227-.059-1.265-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.42-.419.819-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.265-.059 1.646-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.258-2.911.553-.788.306-1.457.715-2.122 1.38-.665.665-1.074 1.334-1.38 2.122-.295.763-.496 1.634-.553 2.911-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.258 2.148.553 2.911.306.788.715 1.457 1.38 2.122.665.665 1.334 1.074 2.122 1.38.763.295 1.634.496 2.911.553 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.258 2.911-.553.788-.306 1.457-.715 2.122-1.38.665-.665 1.074-1.334 1.38-2.122.295-.763.496-1.634.553-2.911.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.258-2.148-.553-2.911-.306-.788-.715-1.457-1.38-2.122-.665-.665-1.334-1.074-2.122-1.38-.763-.295-1.634-.496-2.911-.553-1.28-.058-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-primary/40 tracking-widest uppercase">Instagram</span>
                    <span className="font-label-caps text-xs tracking-widest font-bold text-primary">@3FTARCHIVES</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
