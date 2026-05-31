/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ShoppingBag, Eye, X, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface MerchStoreProps {
  onAddToCart: (product: Product, size?: string) => void;
  isStandalonePage?: boolean;
}

export default function MerchStore({ onAddToCart, isStandalonePage = true }: MerchStoreProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'T-Shirts' | 'Hoodies' | 'Other'>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Track selected size per apparel product in the grid
  const [gridSelectedSizes, setGridSelectedSizes] = useState<{ [productId: string]: string }>({});
  // Track selected size inside the Quick View modal
  const [modalSelectedSize, setModalSelectedSize] = useState<string>('M');

  const merchImages = {
    flowerpotTee:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/d43303126593801505f850338cbe6a64db1fe1f0/original/0ffbc414-d128-4a15-afe2-07c265038cf8.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    upHoodie:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/f9dfb8cb47c2138a8157487c6e18a776e9b155a1/original/8335791d-de79-47a6-890a-cef736127a77.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    bentOutOfShapeHoodie:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/95ed47be6aac924d1f3c2126e0cb3f9dfd844e5a/original/32b558fd-4a79-4d32-8033-803bb17b7f4e.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    cavePedestrianTee:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/92ef4d75dc6344b1a33630b5d9b8bdb0c965725a/original/c6b997ba-49ba-4ce8-807c-ff63e27d4e7d.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    heartlessGoddessHoodie:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/3240b7baa17b61e6cc1cf78ce10bdfb242e2c088/original/ed940148-227b-4572-a086-0de111354608.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    iMissMyHeartHoodie:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/2d66925fb7371ae80ca5137a2c1668c39f32e8e4/original/f63234cc-0f10-4801-ae4e-3fbacc59bb06.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    cavePedestrianHoodie:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/f51d7b189b612aace8369cd249af295309412217/original/437bc4bb-a2ab-4199-ae3a-2ca63c58875f.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    movingOnPoster:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/578fbbbc7d625b6b582fc86383e200f13da69bde/original/2289c849-22ca-484a-affd-5a76afa5891c.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    movingOnHoodie:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/268bfd2967778ca3dce561f77f1513b28dc5227a/original/50a1e06a-2219-4872-a4ce-13456c952c0f.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    movingOnTote:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/24a4aea82646b02d683c96f084c295eaf1f174cf/original/1e3b3dc1-eb69-42cc-9a09-b0465cdd8e84.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    movingOnWomensTee:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/4b6261f81fb5ea50f2259b01ecd58028d526c533/original/00ed75f2-53d8-43a8-8d74-d926bd0cada4.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    movingOnMug:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/0aa4fc8ab02c40f0dbd2ae15211e7c233c3cca63/original/b1af84f1-60c8-4a9d-9951-950cd2b6a19e.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
    movingOnUnisexTee:
      'https://images.zoogletools.com/s:bzglfiles/u/1305706/00c92aea77881a6b6e747bcbb6d758529a9e209a/original/4662b9be-de3e-4aad-ac53-af2f73489e08.png/!!/b%3AW1sicmVzaXplIixbMTYwMCwxNjAwLHsid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlLCJmaXQiOiJpbnNpZGUifV1dXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.png',
  };

  const merchProducts: Product[] = [
    {
      id: 'prod-flowerpot-tshirt',
      name: 'Flowerpot',
      type: 'Unisex T-Shirt',
      price: 25,
      image: merchImages.flowerpotTee,
      category: 'T-Shirts',
      description: 'The iconic high-density screenprinted t-shirt portraying Dudja\'s trademark red flowerpot. Crafted in organic luxury heavy cotton.'
    },
    {
      id: 'prod-up-hoodie',
      name: 'Up',
      type: 'Classic Unisex Pullover Hoodie',
      price: 28,
      image: merchImages.upHoodie,
      category: 'Hoodies',
      description: 'Ultra-plush fleece hoodie representing the fast release tracks. Built with premium side rib-panels, heavy drawcords, and custom label art.'
    },
    {
      id: 'prod-bent-out-of-shape-hoodie',
      name: 'Bent Out Of Shape (Rap Version)',
      type: 'Classic Unisex Pullover Hoodie',
      price: 46,
      image: merchImages.bentOutOfShapeHoodie,
      category: 'Hoodies',
      description: 'Official single edition hoodie for the Rap Version cut. Crimson embroidery across clean structural washed fleece.'
    },
    {
      id: 'prod-cave-pedestrian-tee',
      name: 'Cave Pedestrian',
      type: 'Unisex T-Shirt',
      price: 25,
      image: merchImages.cavePedestrianTee,
      category: 'T-Shirts',
      description: 'Limited run 280GSM heavy crewneck tee. Subtly printed with industrial grit ink, echoing themes of subterranean Boston.'
    },
    {
      id: 'prod-heartless-goddess-hoodie',
      name: 'Heartless Goddess (feat. Emily Daniels)',
      type: 'Classic Unisex Pullover Hoodie',
      price: 46,
      image: merchImages.heartlessGoddessHoodie,
      category: 'Hoodies',
      description: 'Premium heavyweight knit hoodie commemorating the collaborative hit with Emily Daniels. Features blood-red detailed back print artwork.'
    },
    {
      id: 'prod-i-miss-my-heart-hoodie',
      name: 'I Miss My Heart',
      type: 'Classic Unisex Pullover Hoodie',
      price: 46,
      image: merchImages.iMissMyHeartHoodie,
      category: 'Hoodies',
      description: 'The legendary "I Miss My Heart" lyrics showcase hoodie. Heavy double-combed cotton fleece guaranteeing high shape retention.'
    },
    {
      id: 'prod-cave-pedestrian-hoodie',
      name: 'Cave Pedestrian',
      type: 'Classic Unisex Pullover Hoodie',
      price: 46,
      image: merchImages.cavePedestrianHoodie,
      category: 'Hoodies',
      description: 'Cozy and protective fleece pullover featuring raw texture graphic designs layered over thick black textiles.'
    },
    {
      id: 'prod-moving-on-poster',
      name: 'Moving On',
      type: 'Fine Art Poster',
      price: 22,
      image: merchImages.movingOnPoster,
      category: 'Other',
      description: 'Stunning 18" x 24" abstract lithograph print supporting the "Moving On" mini-album. Crisp crimson pigment typography on museum-grade matte paper.'
    },
    {
      id: 'prod-moving-on-hoodie',
      name: 'Moving On',
      type: 'Classic Unisex Pullover Hoodie',
      price: 37,
      image: merchImages.movingOnHoodie,
      category: 'Hoodies',
      description: 'Street-focused comfortable fleece hoodie celebrating Dudja\'s transitional era. Highly durable graphic prints.'
    },
    {
      id: 'prod-moving-on-tote',
      name: 'Moving On',
      type: 'Tote bag',
      price: 26,
      image: merchImages.movingOnTote,
      category: 'Other',
      description: 'Tough, double-stiched black canvas tote engineered with extra volume capacity. Displaying high-contrast red paint brush calligraphy.'
    },
    {
      id: 'prod-moving-on-womens-tee',
      name: 'Moving On',
      type: 'Women\'s Cut T-Shirt',
      price: 27,
      image: merchImages.movingOnWomensTee,
      category: 'T-Shirts',
      description: 'Perfect tailored relaxed-cut feminine tee. Organic combed ringspun cotton with high color fidelity graphics.'
    },
    {
      id: 'prod-moving-on-mug',
      name: 'Moving On',
      type: 'Ceramic Mug',
      price: 13,
      image: merchImages.movingOnMug,
      category: 'Other',
      description: 'Stoneware heavy ceramic mug holding 15oz of beverage. Etched with "Moving On" minimal outline lyrics. Dishwasher proof.'
    },
    {
      id: 'prod-moving-on-unisex-tee',
      name: 'Moving On',
      type: 'Unisex T-Shirt',
      price: 25,
      image: merchImages.movingOnUnisexTee,
      category: 'T-Shirts',
      description: 'Our primary everyday boxy fit street t-shirt. Ideal backdrop for layer outerwear stylings, finished with woven tags.'
    }
  ];

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = activeFilter === 'All' 
    ? merchProducts 
    : merchProducts.filter(p => p.category === activeFilter);

  const handleOpenQuickView = (prod: Product) => {
    setSelectedProduct(prod);
    setModalSelectedSize(gridSelectedSizes[prod.id] || 'M');
  };

  return (
    <section 
      id="merch"
      className="relative w-full py-24 px-4 md:px-12 bg-black border-t border-white/5 scroll-mt-20 min-h-screen"
    >
      {/* Background Ambience Graphics */}
      <div className="absolute right-0 bottom-10 font-display text-[16rem] leading-none text-white/[0.01] uppercase select-none pointer-events-none">
        BOUTIQUE
      </div>

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/*Standalone boutique banner layout */}
        {isStandalonePage && (
          <div className="mb-20 pb-12 border-b border-white/5 text-center flex flex-col items-center">
            <span className="font-mono text-xs tracking-[0.4em] text-brand-red uppercase block mb-3 font-semibold">
              /// BOSTON INDUSTRIAL DESIGN LAB
            </span>
            <h1 className="font-display text-6xl md:text-8xl text-brand-bone tracking-widest uppercase mb-4 text-stroke">
              DUDJA SUPPLY
            </h1>
            <p className="font-mono text-xs text-neutral-400 max-w-xl mx-auto tracking-wide leading-relaxed uppercase">
              Official merch manufactured for comfort, longevity, and raw aesthetic projection.
              Designed in Boston, Massachusetts. Every item is heavily screenprinted on luxury raw blanks.
            </p>
          </div>
        )}

        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-red uppercase block mb-2 font-bold">
              // BOUTIQUE COLLECTION
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-brand-bone tracking-wide uppercase">
              SELECT ITEMS
            </h2>
            <div className="w-16 h-1 bg-brand-red mt-4" />
          </div>

          {/* Filtering controls (Brutalist style) */}
          <div id="merch-filters" className="flex flex-wrap gap-2 border border-white/10 bg-brand-bg-card p-1 rounded-lg">
            {(['All', 'T-Shirts', 'Hoodies', 'Other'] as const).map((filter) => (
              <button
                key={filter}
                id={`filter-btn-${filter.toLowerCase()}`}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-[11px] tracking-widest uppercase transition-all duration-300 rounded cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-brand-red text-brand-bone font-bold shadow-md'
                    : 'text-neutral-400 hover:text-brand-bone hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Brutalist product grid */}
        <div 
          id="product-grid" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white/10 gap-[2px] p-[2px] border border-white/10 rounded-lg overflow-hidden select-none"
        >
          {filteredProducts.map((product) => {
            const isClothing = product.category === 'T-Shirts' || product.category === 'Hoodies';
            const curSize = gridSelectedSizes[product.id] || 'M';

            return (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                key={product.id}
                id={`product-card-${product.id}`}
                className="group bg-[#080808] flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:bg-[#111111]"
              >
                {/* Image Frame Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-black flex items-center justify-center p-4 border-b border-white/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  />
                  
                  {/* Stock counter helper label */}
                  <span className="absolute top-3 left-3 font-mono text-[8px] bg-red-950/80 border border-brand-red/35 px-2 py-0.5 rounded-full text-brand-red font-bold uppercase tracking-wider">
                    {product.price > 35 ? 'Low Stock' : 'Limited Run'}
                  </span>

                  {/* Visual Glow Layer */}
                  <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Instant Actions (Eye icon overlay) */}
                  <button
                    id={`quick-view-${product.id}`}
                    onClick={() => handleOpenQuickView(product)}
                    className="absolute bottom-4 right-4 p-2.5 bg-black/85 border border-white/10 text-brand-bone rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:border-brand-red hover:text-brand-red cursor-pointer"
                    title="Quick View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info Block */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase block mb-1">
                      {product.type}
                    </span>
                    <p className="font-display text-2xl text-brand-bone tracking-wide group-hover:text-brand-red duration-300 leading-tight">
                      {product.name}
                    </p>
                    
                    {/* Inline Size selection for clothing */}
                    {isClothing && (
                      <div className="mt-3">
                        <span className="font-mono text-[9px] text-[#817b73] uppercase tracking-wider block mb-1.5 font-bold">Select Size:</span>
                        <div className="flex gap-1">
                          {sizeOptions.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setGridSelectedSizes(prev => ({ ...prev, [product.id]: sz }))}
                              className={`w-7 h-7 flex items-center justify-center rounded font-mono text-[10px] border cursor-pointer transition-colors ${
                                curSize === sz
                                  ? 'bg-brand-red border-brand-red text-white font-bold'
                                  : 'border-white/5 bg-black text-neutral-400 hover:border-neutral-500 hover:text-brand-bone'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="font-display text-2xl text-brand-red tracking-wider font-semibold">
                      ${product.price}.00
                    </span>
                    
                    <button
                      id={`add-to-cart-${product.id}`}
                      onClick={() => onAddToCart(product, isClothing ? curSize : undefined)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 border border-brand-bone/15 group-hover:border-brand-red bg-transparent text-brand-bone hover:bg-brand-red hover:text-brand-bone transition-all duration-300 font-mono text-[10px] tracking-widest font-semibold cursor-pointer uppercase rounded"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>BUY NOW</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* E-Commerce trust guarantees footer banner inside the page */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
          <div className="p-4 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center gap-4">
            <Truck className="w-8 h-8 text-brand-red flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] text-white uppercase block tracking-wider font-semibold">GLOBAL TRANSIT</span>
              <p className="font-mono text-xs text-neutral-400 mt-0.5 uppercase">Shipped in heavy-duty eco bags within 48 Hours. Boston local collection available.</p>
            </div>
          </div>
          <div className="p-4 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-brand-red flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] text-white uppercase block tracking-wider font-semibold">SECURE GATEWAY</span>
              <p className="font-mono text-xs text-neutral-400 mt-0.5 uppercase">Checkout processes are heavily secured under SSL encryption using Stripe payment layers.</p>
            </div>
          </div>
          <div className="p-4 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center gap-4">
            <RotateCcw className="w-8 h-8 text-brand-red flex-shrink-0" />
            <div>
              <span className="font-mono text-[10px] text-white uppercase block tracking-wider font-semibold">30 DAY CYCLE RETURN</span>
              <p className="font-mono text-xs text-neutral-400 mt-0.5 uppercase">Unhappy with garment fitness? Easy refund loops supported by our 24/7 service desk.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Quick View Product Modal popup */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="product-modal-backdrop"
            className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              id="product-modal-content"
              className="bg-brand-bg-card border border-white/10 max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button top corner */}
              <button
                id="close-product-modal"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/55 border border-white/10 rounded-full text-brand-bone hover:text-brand-red cursor-pointer transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Photo frame left */}
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[480px] bg-[#0c0c0c] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/5">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg max-h-[380px]"
                  />
                </div>

                {/* Details context right */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <span className="font-mono text-[10px] text-brand-red font-bold tracking-[0.2em] uppercase">{selectedProduct.type}</span>
                      <h3 className="font-display text-4xl text-brand-bone tracking-wide mt-1 uppercase">{selectedProduct.name}</h3>
                      
                      {/* Rating Stars Mock-up */}
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex text-brand-red">
                          <Star className="w-3.5 h-3.5 fill-brand-red" />
                          <Star className="w-3.5 h-3.5 fill-brand-red" />
                          <Star className="w-3.5 h-3.5 fill-brand-red" />
                          <Star className="w-3.5 h-3.5 fill-brand-red" />
                          <Star className="w-3.5 h-3.5 fill-brand-red" />
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400 uppercase">5.0 (18 verified purchases)</span>
                      </div>
                    </div>
                    
                    <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                      {selectedProduct.description || 'Exclusive official Dudja item custom printed for the 25/26 Boston Alternative series.'}
                    </p>

                    {/* Sizings in Dialog specifically for clothing */}
                    {(selectedProduct.category === 'T-Shirts' || selectedProduct.category === 'Hoodies') && (
                      <div>
                        <span className="font-mono text-[10px] text-white tracking-widest uppercase block mb-1.5 font-bold">Select Sizings:</span>
                        <div className="flex gap-2">
                          {sizeOptions.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setModalSelectedSize(sz)}
                              className={`w-9 h-9 flex items-center justify-center rounded font-mono text-xs border cursor-pointer transition-colors ${
                                modalSelectedSize === sz
                                  ? 'bg-brand-red border-brand-red text-white font-bold'
                                  : 'border-white/10 bg-black text-[#a19c96] hover:border-neutral-400'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                        <span className="font-mono text-[9px] text-[#716c65] uppercase block mt-1.5 font-semibold">Standard modern oversized streetwear look. Fit fits true to size.</span>
                      </div>
                    )}

                    <div className="bg-black/40 border border-white/5 p-3 rounded-lg">
                      <span className="font-mono text-[9px] text-green-500 font-bold block uppercase tracking-wider">📦 IN STOCK & READY FOR DISPATCH</span>
                      <span className="font-mono text-[9px] text-neutral-500 block uppercase mt-0.5">Usually ships next business day from Massachusetts, USA.</span>
                    </div>

                    <div className="font-display text-4xl text-brand-red tracking-wider font-semibold">
                      ${selectedProduct.price}.00 USD
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex gap-3">
                    <button
                      id="modal-add-to-cart"
                      onClick={() => {
                        const isClo = selectedProduct.category === 'T-Shirts' || selectedProduct.category === 'Hoodies';
                        onAddToCart(selectedProduct, isClo ? modalSelectedSize : undefined);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 flex items-center justify-center space-x-2 py-3 bg-brand-red text-brand-bone hover:bg-brand-red-hover transition-colors font-mono text-xs tracking-widest font-bold cursor-pointer uppercase rounded-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO SELECTIONS</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
