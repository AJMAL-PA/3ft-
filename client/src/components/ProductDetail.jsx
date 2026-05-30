import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../context/SettingsContext';
import { productService } from '../services/productService';
import { getImageUrl } from '../services/api';
import ProductCard from './ProductCard';

export default function ProductDetail({ product, onNavigate, previousPage }) {
  const { settings } = useSettings();
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [activeImage, setActiveImage] = useState(product?.image);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  const images = product?.images && product.images.length > 0
    ? product.images
    : [product?.image].filter(Boolean);

  // Set default selected values for all attributes
  useEffect(() => {
    if (product?.productType === 'variable') {
      const initialSelections = {};
      if (product.attributes && product.attributes.length > 0) {
        product.attributes.forEach((attr) => {
          if (attr.values && attr.values.length > 0) {
            initialSelections[attr.name] = attr.values[0];
          }
        });
      } else {
        const availableSizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
        initialSelections['Size'] = availableSizes[0] || 'M';
      }
      setSelectedAttributes(initialSelections);
    } else {
      setSelectedAttributes({});
    }
  }, [product]);

  const categoryName = product?.category?.name || product?.category || '';
  const displayPrice = typeof product?.price === 'number'
    ? `₹${product.price.toLocaleString()}`
    : typeof product?.price === 'string'
      ? product.price.replace('¥', '₹')
      : product?.price || '';

  // Fetch related products of the same category
  useEffect(() => {
    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        const res = await productService.getAll();
        const allProducts = res.data.data || [];
        
        // Find category ID of current product
        const currentCatId = product?.category?._id || product?.category;
        
        const filtered = allProducts.filter(p => {
          const pCatId = p.category?._id || p.category;
          return pCatId === currentCatId && p._id !== product?._id;
        }).slice(0, 4); // Limit to 4 recommended items
        
        setRelatedProducts(filtered);
      } catch (err) {
        console.error('Error fetching related products:', err);
      } finally {
        setLoadingRelated(false);
      }
    };
    
    if (product?._id) {
      fetchRelated();
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] pt-32 px-6 flex flex-col items-center justify-center">
        <p className="text-gray-500 font-label-caps tracking-[0.2em] mb-4">PRODUCT NOT FOUND</p>
        <button
          onClick={() => onNavigate('shop')}
          className="border border-black px-6 py-3 font-label-caps text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
        >
          BACK TO SHOP
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f9f9f9] text-[#111] py-20 md:py-32 px-6 md:px-12 lg:px-24 min-h-screen font-body-base">
      
      {/* Back Button */}
      <div className="mb-12">
        <button
          onClick={() => onNavigate(previousPage || 'shop')}
          className="group flex items-center gap-2 text-[10px] md:text-xs font-label-caps tracking-[0.25em] font-bold text-[#111] hover:text-[#9a2a2a] transition-colors duration-300 uppercase cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          BACK TO {previousPage === 'home' ? 'HOME' : 'CATALOG'}
        </button>
      </div>

      {/* Product Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-32">
        
        {/* Left Column: Product Images (Gallery) */}
        <div className="flex flex-col gap-4 w-full">
          {/* Main Display Image */}
          <div className="w-full aspect-square bg-[#eee] relative overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center">
            <img 
              src={getImageUrl(activeImage || product.image)} 
              alt={product.title} 
              className="w-full h-full object-cover object-center transition-all duration-300"
              style={{ filter: 'grayscale(5%) contrast(105%)' }}
            />
            {product.isFeatured && (
              <div className="absolute top-4 left-4 bg-[#9a2a2a] text-white text-[8px] md:text-[9px] font-bold tracking-widest uppercase px-3 py-1 z-10">
                FEATURED PIECE
              </div>
            )}
          </div>

          {/* Thumbnail list (Only visible if the admin uploaded multiple images) */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin">
              {images.map((imgUrl, idx) => {
                const isActive = getImageUrl(activeImage || product.image) === getImageUrl(imgUrl);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-12 h-12 md:w-20 md:h-20 flex-shrink-0 bg-[#eee] border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'border-[#9a2a2a] scale-105 shadow-md ring-2 ring-[#9a2a2a]/10' 
                        : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={getImageUrl(imgUrl)} 
                      alt={`${product.title} view ${idx + 1}`} 
                      className="w-full h-full object-cover object-center" 
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Details Panel */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4 md:space-y-6">
            
            {/* Category */}
            <div className="space-y-1">
              <span className="text-gray-400 font-label-caps tracking-[0.2em] text-[9px] sm:text-[10px] uppercase font-bold">
                {categoryName}
              </span>
              <h1 className="font-headline-lg text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-[#111] uppercase tracking-wider font-extrabold">
                {product.title}
              </h1>
              {product.description && (
                <p className="text-gray-500/80 text-xs md:text-sm font-normal leading-relaxed mt-1 md:mt-2" style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}>
                  {product.description}
                </p>
              )}
            </div>

            {/* Price & Availability */}
            <div className="flex items-center gap-4 py-3 md:py-4 border-y border-gray-200/60">
              <span className="font-label-caps text-base sm:text-xl md:text-2xl font-bold text-[#111] tracking-widest">
                {displayPrice}
              </span>
              <span className={`font-label-caps text-[9px] sm:text-[10px] font-bold border px-2.5 py-0.5 sm:px-3 sm:py-1 tracking-widest ${
                product.inStock !== false 
                  ? 'text-[#9a2a2a] border-[#9a2a2a]/20 bg-[#9a2a2a]/5' 
                  : 'text-gray-400 border-gray-200 bg-gray-50'
              }`}>
                {product.inStock !== false ? 'IN STOCK' : 'SOLD OUT'}
              </span>
            </div>

            {/* Attributes Selection Options */}
            {product.productType === 'variable' && (
              <div className="space-y-3 py-3 md:space-y-4 md:py-4">
                {product.attributes && product.attributes.length > 0 ? (
                  product.attributes.map((attr) => (
                    <div key={attr.name} className="space-y-2 md:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-label-caps tracking-[0.2em] text-[9px] sm:text-[10px] uppercase font-bold">
                          SELECT {attr.name}
                        </span>
                        {attr.name.toLowerCase() === 'size' && (
                          <span className="text-[#9a2a2a] font-label-caps tracking-wider text-[9px] sm:text-[10px] uppercase font-bold cursor-pointer hover:underline">
                            SIZE GUIDE
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {attr.values.map((val) => {
                          const isSelected = selectedAttributes[attr.name] === val;
                          return (
                            <button
                              key={val}
                              onClick={() => setSelectedAttributes({ ...selectedAttributes, [attr.name]: val })}
                              className={`h-9 min-w-9 md:h-12 md:min-w-12 px-3 md:px-5 border flex items-center justify-center font-label-caps text-[10px] md:text-xs tracking-wider transition-all duration-300 font-bold cursor-pointer ${
                                isSelected
                                  ? 'border-[#9a2a2a] text-[#9a2a2a] bg-[#9a2a2a]/5 font-black scale-105'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white hover:text-[#111]'
                              }`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  /* Fallback for legacy variable products */
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-label-caps tracking-[0.2em] text-[9px] sm:text-[10px] uppercase font-bold">
                        SELECT SIZE
                      </span>
                      <span className="text-[#9a2a2a] font-label-caps tracking-wider text-[9px] sm:text-[10px] uppercase font-bold cursor-pointer hover:underline">
                        SIZE GUIDE
                      </span>
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      {(product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL']).map((size) => {
                        const isSelected = selectedAttributes['Size'] === size;
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectedAttributes({ ...selectedAttributes, Size: size })}
                            className={`w-9 h-9 md:w-12 md:h-12 border flex items-center justify-center font-label-caps text-[10px] md:text-xs tracking-wider transition-all duration-300 font-bold cursor-pointer ${
                              isSelected
                                ? 'border-[#9a2a2a] text-[#9a2a2a] bg-[#9a2a2a]/5 font-black scale-105'
                                : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white hover:text-[#111]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className={`pt-3 md:pt-4 ${product.productType === 'variable' ? 'border-t border-gray-200/60' : ''}`}>
              {product.inStock !== false ? (
                <a
                  href={`https://wa.me/${(settings?.whatsappNumber || '9846417073').replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                    product.productType === 'variable'
                      ? `I want to buy this product: ${product.title} (${Object.entries(selectedAttributes)
                          .map(([name, val]) => `${name}: ${val}`)
                          .join(', ')})`
                      : `I want to buy this product: ${product.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#111] text-white hover:bg-[#25D366] py-3 md:py-4 rounded-none font-label-caps text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-xl transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  ORDER VIA WHATSAPP
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-400 py-3 md:py-4 font-label-caps text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center justify-center gap-3 cursor-not-allowed border border-gray-300/40"
                >
                  OUT OF STOCK
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="border-t border-gray-200 pt-16">
        <h3 className="font-headline-lg text-xl md:text-2xl tracking-wider text-[#111] uppercase font-bold mb-10">
          RECOMMENDED FOR YOU
        </h3>
        
        {loadingRelated ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-[#9a2a2a]/30 border-t-[#9a2a2a] rounded-full animate-spin" />
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard 
                key={p._id} 
                product={p} 
                onClick={(prod) => {
                  onNavigate('product-detail', prod);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xs tracking-wider uppercase font-semibold font-label-caps">No recommended pieces available at this moment.</p>
        )}
      </div>

    </div>
  );
}
