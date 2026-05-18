import React from 'react';
import img1 from '../assets/download (5).jpeg';
import img2 from '../assets/download (4).jpeg';
import img3 from '../assets/Rasant Adidas Spring 2025 (Adidas).jpeg';

const EditorialSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#0b0b0b] text-surface overflow-hidden flex flex-col lg:flex-row items-stretch border-b border-primary">
      
      {/* Left Content (Typography) */}
      <div className="w-full lg:w-[45%] z-20 flex flex-col justify-center p-8 lg:p-16 xl:p-24 order-2 lg:order-1 pt-12 lg:pt-16">
        <div className="animate-fade-in-up">
          



          {/* Offer & CTA */}
          <div className="flex flex-col items-center text-center transform -translate-x-4 md:-translate-x-8 lg:-translate-x-12">
            <p className="font-label-caps text-surface/60 mb-4 tracking-widest">NEW ARRIVALS WEEKLY</p>
            <h2 className="font-headline-lg text-5xl md:text-7xl text-orange-500 leading-[0.9] drop-shadow-lg mb-8">
              THRIFTED<br/><span className="text-4xl md:text-5xl text-orange-400">NOT REPLICATED</span>
            </h2>
            <button className="bg-surface text-[#0b0b0b] px-10 py-4 font-label-caps text-sm font-bold tracking-widest hover:bg-orange-500 hover:text-surface transition-colors duration-300">
              SHOP COLLECTION
            </button>
          </div>
          
        </div>
      </div>

      {/* Right Images (Skewed Layout) */}
      <div className="w-full lg:w-[65%] h-[50vh] lg:h-auto relative lg:absolute right-0 top-0 bottom-0 z-10 flex gap-2 md:gap-4 overflow-hidden order-1 lg:order-2">
        {/* We apply the skew container-wide to slant the gaps, and unskew the images so they remain upright */}
        <div className="absolute -inset-x-8 inset-y-0 flex gap-2 md:gap-4 transform lg:-skew-x-12 lg:-translate-x-4">
          
          {/* Panel 1 */}
          <div className="flex-1 relative overflow-hidden group bg-[#111]">
            <img 
              src={img1} 
              alt="Streetwear model" 
              className="absolute inset-0 w-[200%] max-w-none h-full object-cover object-center transform lg:skew-x-12 lg:-translate-x-[25%] group-hover:scale-110 transition-transform duration-[1000ms] ease-out" 
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button className="pointer-events-auto px-8 py-3 border border-white/40 text-white bg-black/10 backdrop-blur-md font-label-caps tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-colors duration-300 transform lg:skew-x-12">
                T-SHIRTS
              </button>
            </div>
          </div>
          
          {/* Panel 2 */}
          <div className="flex-1 relative overflow-hidden group bg-[#111]">
            <img 
              src={img2} 
              alt="Premium Footwear" 
              className="absolute inset-0 w-[200%] max-w-none h-full object-cover object-center transform lg:skew-x-12 lg:-translate-x-[25%] group-hover:scale-110 transition-transform duration-[1000ms] ease-out" 
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button className="pointer-events-auto px-8 py-3 border border-white/40 text-white bg-black/10 backdrop-blur-md font-label-caps tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-colors duration-300 transform lg:skew-x-12">
                JACKETS
              </button>
            </div>
          </div>
          
          {/* Panel 3 */}
          <div className="flex-1 relative overflow-hidden group bg-[#111] hidden md:block">
            <img 
              src={img3} 
              alt="Fashion Details" 
              className="absolute inset-0 w-[200%] max-w-none h-full object-cover object-center transform lg:skew-x-12 lg:-translate-x-[25%] group-hover:scale-110 transition-transform duration-[1000ms] ease-out" 
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button className="pointer-events-auto px-8 py-3 border border-white/40 text-white bg-black/10 backdrop-blur-md font-label-caps tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-colors duration-300 transform lg:skew-x-12">
                BOTTOMS
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default EditorialSection;
