import React from 'react';

const FeaturedProducts = () => {
  return (
    <section className="bg-surface-variant py-24 px-margin-mobile md:px-margin-desktop">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <span className="font-label-caps text-label-caps text-secondary mb-2 block">CURATED ARCHIVE</span>
          <h2 className="font-headline-lg text-headline-lg">FEATURED PIECES</h2>
        </div>
        <p className="font-title-md italic max-w-md text-right md:text-left">"Fashion is not just clothes, it's the history we wear."</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {/* Product 1 */}
        <div className="col-span-2 row-span-2 group cursor-pointer">
          <div className="relative h-full overflow-hidden rounded-lg bg-surface">
            <img 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
              alt="A detailed close-up shot of a vintage heavyweight hoodie in a faded charcoal grey. The camera focuses on the worn-in texture of the cotton and the subtle distressing around the cuffs. Set against a clean, light-filled studio background, the image emphasizes quality and the unique character of archival streetwear." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1i6MMgKhiJ0LqW4RV_EJ3REriZuf4W5dtvJjfDal2GTzpYFA7nyIn6RPXnkk2HSKbSlYh6UPApWOx2ym5oAkdkFPEUCeqXgQ8m9JBuxYtOLg4P8pkmMbRShnsla3rl4mjspfHx__j5zks9oyXSDev6Hox97WNnF6Oxb9ovvfafFzSwLnFmkpv86-zbcBAp_R427iveJpToPQfsKYQBbu5XrNFRWOzjZN_ltO2E2eX9MSeF-NYB_3_diBzbjCtaHleG3-FpHX32rM"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-surface">
              <h4 className="font-headline-lg text-title-md">OVERSIZED WASHED HOODIE</h4>
              <div className="flex justify-between items-center mt-2">
                <span className="font-label-caps text-label-caps">SIZE: L</span>
                <span className="font-label-caps text-label-caps">$120.00</span>
              </div>
            </div>
          </div>
        </div>
        {/* Product 2 */}
        <div className="col-span-1 group cursor-pointer">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <img 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              alt="A vertical portrait of a model wearing a minimalist white graphic tee tucked into high-waisted black vintage trousers. The shot is framed in a way that emphasizes the clean lines and silhouette, using soft natural light to create a timeless, editorial feel that aligns with the brand's minimalist streetwear focus." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2GSRQOudQkMJ4rDfNBfLcOcLqoPzVF-D8PfbCdbaKaOtdIQI3R0GoCyRDI7tYtQK28SD2dKx9dAC4dptwkq8H627OeZTd5mzBE7Urg3Hnw9tvwFTJFjWSy43Tgrfqj2eMd_dMc4VSAPE7vbspM2n8ycaPBRVB3cuZoaA4_kyByS0OahZpf8XAW-x36eJdWNUDZntMluA2Ybkye6L_LCumOUPz9P3Ygrm_QpJOf4FlGD2-tNlEmKtsDZ4C_mRSNpIEOxSE1puKk4g"
            />
          </div>
          <div className="mt-4 flex justify-between px-2">
            <span className="font-label-caps text-label-caps">90S GRAPHIC TEE</span>
            <span className="font-label-caps text-label-caps">$45.00</span>
          </div>
        </div>
        {/* Product 3 */}
        <div className="col-span-1 group cursor-pointer translate-y-8 md:translate-y-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <img 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              alt="A high-contrast photograph of a pair of vintage blue denim jeans laid out on a dark concrete floor. The lighting picks up the whiskers and honeycombs of the fade, telling a story of previous wear. The image is clean and stark, focusing purely on the archival quality of the denim garment." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3CI_XJVWf00wwCe_Hk1JzdDzkMq9O3EuE88jJIxeanPk5RyCYfnN6qcnM9kR3g9Dnjr6oJTl6y8vJcZBcgBnOoigZZOVxOiD-HzSb0-_JBmNsRffvHHpx7mxJ0OuniBUkxrJj7qYZ2mi3_E_qGzfRhEsF9RV9V0h2RJiB6hb4r_QkAJjoeSdQzMorqBZ22meJkra-rAdFC63NNzjC76p2IQgKqH1QAVQ-9QNqgaigfMV8DFaE8fjTWxp6jSFgJbFRpw7LiIeaAUo"
            />
          </div>
          <div className="mt-4 flex justify-between px-2">
            <span className="font-label-caps text-label-caps">SELVEDGE DENIM</span>
            <span className="font-label-caps text-label-caps">$85.00</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
