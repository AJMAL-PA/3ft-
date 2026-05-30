import React from 'react';
import { motion } from 'motion/react';
import heroVideo from '../assets/From KlickPin CF Need fresh inspiration_ Copy these dreamy cat enrichment ideas that bring style function and personality together with smart steps cute details - Pin-1117103882557670056.mp4';
import heroVideoMobile from '../assets/Bridal shower decor ideas that look expensive while staying practical realistic and beginner friendly for beginners who want impressive results - Pin-957366833287165490.mp4';
import Shuffle from './TextAnimations/Shuffle/Shuffle';
import TrueFocus from './TextAnimations/TrueFocus/TrueFocus';
import BlurText from './TextAnimations/BlurText/BlurText';

const Hero = ({ onNavigate, preloaderFinished }) => {
  return (
    <section className="relative w-full h-[580px] md:h-[750px] overflow-hidden flex items-center justify-center border-b border-primary">
      {/* Desktop Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="hidden md:block absolute top-1/2 left-1/2 w-[1100px] h-[100vw] max-w-none object-contain transform -translate-x-1/2 -translate-y-1/2 -rotate-90 bg-black"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Mobile Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="block md:hidden absolute inset-0 w-full h-full object-cover bg-black"
      >
        <source src={heroVideoMobile} type="video/mp4" />
      </video>
      
      {/* Text Overlay */}
      <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-4xl mx-auto mt-4 md:mt-8">
        <div className="font-label-caps text-[10px] md:text-xs tracking-[0.2em] text-surface bg-[#0b0b0b]/80 backdrop-blur-md px-6 py-3 mb-4 md:mb-8 border border-white/20 flex items-center justify-center min-h-[40px] min-w-[280px]">
          {preloaderFinished && (
            <TrueFocus 
              sentence="SUSTAINABLE STREETWEAR"
              manualMode={false}
              blurAmount={1.5}
              borderColor="#9a2a2a"
              glowColor="rgba(154, 42, 42, 0.3)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.5}
            />
          )}
        </div>
        
        <h2 className="font-headline-lg text-[50px] sm:text-[80px] md:text-[150px] leading-[0.85] text-surface drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] mb-3 md:mb-6 flex flex-col items-center min-h-[70px] sm:min-h-[140px] md:min-h-[256px] justify-center">
          {preloaderFinished && (
            <>
              <Shuffle text="CURATED" tag="span" shuffleDirection="up" duration={0.35} animationMode="random" maxDelay={0.3} stagger={0.03} />
              <Shuffle text="THRIFT" tag="span" shuffleDirection="up" duration={0.35} animationMode="random" maxDelay={0.3} stagger={0.03} />
            </>
          )}
        </h2>

        <div className="min-h-[48px] flex items-center justify-center mb-6 md:mb-12">
          {preloaderFinished && (
            <BlurText
              text="CURATED VINTAGE & ARCHIVAL STREETWEAR"
              delay={50}
              animateBy="words"
              direction="bottom"
              className="font-label-caps text-surface text-xs md:text-sm tracking-[0.2em] max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed justify-center text-center font-bold"
            />
          )}
        </div>

        <div className="min-h-[56px]">
          {preloaderFinished && (
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              onClick={() => onNavigate && onNavigate('shop')}
              className="bg-surface text-[#0b0b0b] px-12 py-4 font-label-caps text-sm font-bold tracking-widest hover:bg-orange-500 hover:text-surface transition-colors duration-300 shadow-xl"
            >
              EXPLORE THE ARCHIVE
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

