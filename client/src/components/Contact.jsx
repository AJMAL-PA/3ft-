import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const { settings, getWhatsAppUrl } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim()) {
      toast.error('PLEASE ENTER YOUR NAME');
      return;
    }
    if (!email.trim()) {
      toast.error('PLEASE ENTER YOUR EMAIL');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('PLEASE ENTER A VALID EMAIL');
      return;
    }
    if (!message.trim()) {
      toast.error('PLEASE ENTER YOUR MESSAGE');
      return;
    }

    // Format message beautifully for WhatsApp with clean bullet points
    const formattedMessage = 
      `*NEW INQUIRY - 3FT ARCHIVES*\n\n` +
      `• *NAME:* ${name.trim().toUpperCase()}\n` +
      `• *EMAIL:* ${email.trim()}\n\n` +
      `• *MESSAGE:*\n${message.trim()}`;

    const num = (settings?.whatsappNumber || '9846417073').replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${num}?text=${encodeURIComponent(formattedMessage)}`;

    window.open(whatsappUrl, '_blank');
    toast.success('OPENING WHATSAPP...');

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="bg-white py-8 md:py-20 px-margin-mobile md:px-margin-desktop border-t border-primary/20">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0b0b0b',
            color: '#fff',
            borderRadius: '0px',
            border: '1px solid rgba(154, 42, 42, 0.2)',
            fontFamily: 'inherit',
            fontSize: '12px',
            letterSpacing: '0.05em'
          }
        }}
      />
      <div className="max-w-7xl mx-auto">

        {/* Large Heading */}
        <h1 className="font-headline-lg text-[40px] sm:text-[60px] md:text-[120px] leading-none uppercase mb-4 md:mb-12 tracking-tighter text-primary text-center lg:text-left">
          CONTAct
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left Column: Minimal Form */}
          <div className="space-y-6 md:space-y-10">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
              <div className="relative group">
                <label className="block font-label-caps text-[10px] tracking-[0.25em] text-primary/50 mb-1.5 uppercase font-bold">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 focus:outline-none focus:ring-0 focus:border-primary font-body-base text-xs sm:text-sm tracking-wider transition-all placeholder:text-primary/30 uppercase"
                  placeholder="ENTER YOUR NAME"
                />
              </div>

              <div className="relative group">
                <label className="block font-label-caps text-[10px] tracking-[0.25em] text-primary/50 mb-1.5 uppercase font-bold">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 focus:outline-none focus:ring-0 focus:border-primary font-body-base text-xs sm:text-sm tracking-wider transition-all placeholder:text-primary/30"
                  placeholder="NAME@EXAMPLE.COM"
                />
              </div>

              <div className="relative group">
                <label className="block font-label-caps text-[10px] tracking-[0.25em] text-primary/50 mb-1.5 uppercase font-bold">Messages</label>
                <textarea
                  rows="2"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b border-primary/20 py-2 px-0 focus:outline-none focus:ring-0 focus:border-primary font-body-base text-xs sm:text-sm transition-all resize-none placeholder:text-primary/30 uppercase"
                  placeholder="HOW CAN WE HELP?"
                ></textarea>
              </div>

              <button type="submit" className="w-full sm:w-auto bg-primary text-surface border border-primary px-8 py-3 rounded-none font-label-caps text-xs tracking-[0.2em] font-bold hover:bg-transparent hover:text-primary transition-all duration-300">
                SUBMIT
              </button>
            </form>
          </div>

          {/* Right Column: Contact Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-background rounded-[24px] sm:rounded-[40px] shadow-2xl overflow-hidden border border-primary/5">

              {/* Card Header */}
              <div className="bg-[#0b0b0b] p-6 sm:p-10 text-center space-y-2">
                <div className="flex justify-center gap-2 mb-2 sm:mb-4">
                  <div className="w-1.5 h-1.5 bg-[#9a2a2a] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[#9a2a2a] rounded-full opacity-50"></div>
                  <div className="w-1.5 h-1.5 bg-[#9a2a2a] rounded-full opacity-20"></div>
                </div>
                <h3 className="text-white font-label-caps text-xs sm:text-sm tracking-widest font-bold uppercase">Get in touch with us!</h3>
                <p className="text-white/60 font-body-base text-[10px] sm:text-xs uppercase tracking-widest">Lets talk!</p>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-10 space-y-4 sm:space-y-6">

                {/* Email */}
                <a 
                  href="mailto:info@3ftarchives.com" 
                  className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] font-bold text-primary/40 tracking-widest uppercase">Email</span>
                    <span className="font-label-caps text-[10px] sm:text-xs tracking-widest font-bold text-primary group-hover:text-[#9a2a2a] transition-colors break-all">INFO@3FTARCHIVES.COM</span>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] font-bold text-primary/40 tracking-widest uppercase">Phone</span>
                    <span className="font-label-caps text-[10px] sm:text-xs tracking-widest font-bold text-primary group-hover:text-[#9a2a2a] transition-colors">+1 234 567 890</span>
                  </div>
                </a>

                {/* WhatsApp — dynamic */}
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md flex-shrink-0">
                    <svg className="w-4.5 h-4.5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.511.895 2.994 1.348 4.745 1.349 5.304 0 9.619-4.315 9.622-9.619.001-2.569-1.002-4.985-2.822-6.806-1.82-1.821-4.237-2.826-6.81-2.827-5.31 0-9.624 4.314-9.628 9.618-.001 1.884.542 3.398 1.573 4.887l-.986 3.593 3.689-.968.617.373zm11.231-3.149c-.274-.136-1.62-.8-1.87-.891-.25-.09-.431-.136-.613.136-.182.273-.704.891-.863 1.072-.159.182-.318.204-.591.068-.272-.137-1.152-.424-2.193-1.355-.811-.723-1.358-1.617-1.517-1.891-.159-.272-.017-.42.12-.556.122-.122.273-.318.409-.477.136-.159.182-.272.272-.454.09-.181.045-.341-.022-.477-.068-.136-.613-1.477-.84-2.023-.222-.536-.445-.463-.613-.472l-.523-.009c-.182 0-.477.068-.727.341-.249.273-.954.932-.954 2.273 0 1.341.977 2.636 1.114 2.818.136.182 1.921 2.934 4.654 4.114.65.281 1.157.448 1.553.573.652.208 1.246.179 1.715.109.523-.078 1.62-.663 1.848-1.303.227-.641.227-1.182.159-1.302-.068-.12-.25-.182-.523-.318z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] font-bold text-primary/40 tracking-widest uppercase">WhatsApp</span>
                    <span className="font-label-caps text-[10px] sm:text-xs tracking-widest font-bold text-primary group-hover:text-[#9a2a2a] transition-colors">SEND A MESSAGE</span>
                  </div>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/3riiift_/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 sm:gap-6 group cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0b0b0b] flex items-center justify-center text-[#9a2a2a] group-hover:scale-110 transition-transform duration-300 shadow-md flex-shrink-0">
                    <svg className="w-4.5 h-4.5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.377.896.419.42.679.819.896 1.377.163.422.358 1.057.412 2.227.059 1.265.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.377-.42.419-.819.679-1.377.896-.422.163-1.057.358-2.227.412-1.265.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.377-.896-.419-.42-.679-.819-.896-1.377-.163-.422-.358-1.057-.412-2.227-.059-1.265-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.377.42-.419.819-.679 1.377-.896.422-.163 1.057-.358 2.227-.412 1.265-.059 1.646-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.148.258-2.911.553-.788.306-1.457.715-2.122 1.38-.665.665-1.074 1.334-1.38 2.122-.295.763-.496 1.634-.553 2.911-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.057 1.277.258 2.148.553 2.911.306.788.715 1.457 1.38 2.122.665.665 1.334 1.074 2.122 1.38.763.295 1.634.496 2.911.553 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.277-.057 2.148-.258 2.911-.553.788-.306 1.457-.715 2.122-1.38.665-.665 1.074-1.334 1.38-2.122.295-.763.496-1.634.553-2.911.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.057-1.277-.258-2.148-.553-2.911-.306-.788-.715-1.457-1.38-2.122-.665-.665-1.334-1.074-2.122-1.38-.763-.295-1.634-.496-2.911-.553-1.28-.058-1.688-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] font-bold text-primary/40 tracking-widest uppercase">Instagram</span>
                    <span className="font-label-caps text-[10px] sm:text-xs tracking-widest font-bold text-primary group-hover:text-[#9a2a2a] transition-colors">@3RIIIFT_</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
