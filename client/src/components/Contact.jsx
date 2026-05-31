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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f2ede4] border border-[#9a2a2a]/15 flex items-center justify-center text-[#9a2a2a] group-hover:text-[#EA4335] group-hover:bg-[#ece8df] group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.086c0 .75-.6 1.357-1.35 1.357h-3.825v-9.6L12 15L5.175 10.3v9.6H1.35C.6 19.9 0 19.3 0 18.543V5.457c0-.75.6-1.357 1.35-1.357H3.9L12 10.8l8.1-6.7h2.55c.75 0 1.35.6 1.35 1.357z"/>
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f2ede4] border border-[#9a2a2a]/15 flex items-center justify-center text-[#9a2a2a] group-hover:text-[#34b7f1] group-hover:bg-[#ece8df] group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 512 512">
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L191.3 160c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f2ede4] border border-[#9a2a2a]/15 flex items-center justify-center text-[#9a2a2a] group-hover:text-[#25D366] group-hover:bg-[#ece8df] group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 448 512">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f2ede4] border border-[#9a2a2a]/15 flex items-center justify-center text-[#9a2a2a] group-hover:text-[#E1306C] group-hover:bg-[#ece8df] group-hover:scale-110 transition-all duration-300 shadow-xs flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 448 512">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
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
