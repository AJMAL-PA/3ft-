import React from 'react';

const PromoGrid = () => {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-24 space-y-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Vertical Card 1 */}
        <div className="group relative bg-surface p-4 rounded-lg flex flex-col gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="An editorial shot of high-end vintage jewelry pieces displayed on a textured matte grey surface. The lighting is soft and high-key, highlighting the intricate gold and silver details of rings and chains. The background is a clean neutral cream, maintaining a high-fashion archival aesthetic that feels curated and luxurious." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-SgxB8SL9ya8D7dlNj1N9IibgFBmk0MRiNFsUvYyP0Ir-G2ASIovywOozTo1h-7DONe5KyP4T9TTc92QMIsUu4q5Bc60X4tWbEbv37z4cRXFOC8EclVP2cagtvUX6Vp-1LDIaCpY0l3OAMCLC4nUH33JD5w6IQFhzCoDO7WJcGRSLgAo4515lCQfgUViyAh2CKXN7dBw6cGyjQ_jzlRTI_RWWKR4ph51l6Zu5nxc-nQJA79Lmahxr1agjNgel07thbTOOGYe-PZ4"
            />
            <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container px-3 py-1 font-label-caps text-label-caps scrapbook-badge">
              NEW ARRIVAL
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline-lg text-title-md uppercase">LIMITED DROP 01</h3>
            <p className="font-body-base text-on-surface-variant">Archival pieces sourced from global capitals. Available until sold out.</p>
            <button className="w-full py-3 border border-primary font-label-caps text-label-caps hover:bg-primary hover:text-surface transition-colors">VIEW PIECES</button>
          </div>
        </div>

        {/* Vertical Card 2 (Inverted Style) */}
        <div className="group relative bg-primary text-surface p-8 rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-headline-lg text-headline-lg leading-tight mb-4">20% OFF<br/>ENDS<br/>TONIGHT</h2>
            <p className="font-body-base text-on-primary-container">Use code: REVIVE20</p>
          </div>
          <div className="mt-8 relative aspect-square">
            <img 
              className="w-full h-full object-cover rounded-full" 
              alt="A vibrant collage image of a streetwear model wearing a bold lime green tracksuit against a stark white background. The composition is dynamic and fragmented, with sharp edges and high contrast that mirrors a modern fashion magazine layout. The colors are punchy and saturated, contrasting beautifully with the matte black brand elements." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5SQf9Y38jCaSq1pJC2kqwoFWm3DOuNWGONZTXObHjJs1Ujm3p_Z327sSAdftzdolFQzzHFNiuEsqRomAicsJHd3SKltwrRs-CNOaYp3RRuo5pQQ8Y3z9YO9F-7GJp1fUlPYpybGSgVumvI5rQ_Zc62GmF_-HD_kdl1WjnzqrEwLmX_W69DNvU_LthWrPJwo2vXuMdU1p0UczZ39rSAuwdmE0PB5u2Jkz4Oumb2XOZbKGi0dFwNxPFMwd3rcHjGnT3EYOmobchP8U"
            />
          </div>
          <button className="relative z-10 mt-8 py-3 bg-surface text-primary font-headline-lg text-title-md digital-invert">GRAB DISCOUNT</button>
        </div>

        {/* Vertical Card 3 */}
        <div className="group relative bg-surface p-4 rounded-lg flex flex-col gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              alt="A minimalist studio setup showing a stack of perfectly folded vintage denim jeans and washed-out t-shirts. The lighting is diffused and even, showcasing the soft textures and authentic wear of the thrifted fabrics. The palette is a mix of faded indigos and off-white creams, fitting the brand's aesthetic of structured chaos and archival beauty." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcIT3Xsd11Ay-VFy8GaJufmTF7aVpau0Ywy3jZf1tXCdkK7KVz8KJ7z9FyvE4jdckGK4iVG8RB2ITTTxekIw-eYtKPEKa7JNFqrOYkOqSUg2Zh7dgrB7lMZeYHgtVpi8fzXZYB-fQQHK2WX8ZcgZ3Eli72rpGBr4bO7pG5_FMX1dlcZKg3-wzK0va_EKsHSEjZ7E-uKxDG-J576RRG9u6uEw6NFboyoI-frVfomWs-NRiuPPuY0Ig0uwHmFbB_ql1YoX7eZOTIi4U"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-headline-lg text-title-md uppercase">TOP PICKS</h3>
            <p className="font-body-base text-on-surface-variant">The essentials for every modular wardrobe. Curated by the REVIVE team.</p>
            <button className="w-full py-3 border border-primary font-label-caps text-label-caps hover:bg-primary hover:text-surface transition-colors">SHOP THE LOOK</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoGrid;
