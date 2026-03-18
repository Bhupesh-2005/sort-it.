import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, ShieldCheck, ThumbsUp, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { name: 'Vegetables', img: '/images/category_vegetables.png' },
  { name: 'Fruits', img: '/images/category_fruits.png' },
  { name: 'Dairy', img: '/images/category_dairy.png' },
  { name: 'Snacks', img: '/images/category_snacks.png' },
  { name: 'Drinks', img: '/images/category_drinks.png' },
  { name: 'Breads', img: '/images/category_breads.png' },
  { name: 'Eggs', img: '/images/category_eggs.png' },
  { name: 'Meats', img: '/images/category_meats.png' }
];

const PROMOS = [
  '/images/promo_1.png',
  '/images/promo_2.png'
];

const FRESH_VEGS = [
  { id: 'v1', name: 'Fresh Onion (Pyaz)', price: 0.49, oldPrice: 0.59, weight: '1 kg', img: '/images/product_onion.png' },
  { id: 'v2', name: 'Tomato (Tamatar) - Hybrid', price: 0.39, weight: '500 g', img: '/images/product_tomato.png' },
  { id: 'v3', name: 'Potato (Aloo)', price: 0.59, oldPrice: 0.69, weight: '1 kg', img: '/images/product_potato.png' },
  { id: 'v4', name: 'Coriander Leaves (Dhaniya)', price: 0.15, weight: '100 g', img: '/images/product_coriander.png' },
];

const SNACKS = [
  { id: 's1', name: 'Lays India\'s Magic Masala Chips', price: 0.25, weight: '50 g', img: '/images/product_lays.png' },
  { id: 's2', name: 'Kurkure Masala Munch', price: 0.25, weight: '90 g', img: '/images/product_kurkure.png' },
  { id: 's3', name: 'Doritos Nacho Cheese', price: 0.69, oldPrice: 0.79, weight: '130 g', img: '/images/product_doritos.png' },
  { id: 's4', name: 'Haldiram\'s Bhujia Sev', price: 1.29, oldPrice: 1.39, weight: '400 g', img: '/images/product_lays.png' },
];

const BESTSELLERS = [
  ...FRESH_VEGS.slice(0, 2),
  ...SNACKS.slice(0, 2)
];

export default function Home() {
  return (
    <div className="pb-24 pt-4 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Promotional Banners Carousel */}
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-6 snap-x">
          {PROMOS.map((promo, i) => (
            <motion.img 
              key={i} 
              src={promo} 
              alt={`Promo ${i}`} 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-[85vw] md:w-[600px] h-[45vw] md:h-[300px] object-cover rounded-2xl md:rounded-3xl shadow-sm snap-center shrink-0 cursor-pointer"
            />
          ))}
        </div>

        {/* Features Section */}
        <section className="mb-10 block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: Truck, title: 'Superfast Delivery', desc: 'Get your order in minutes' },
              { icon: ShieldCheck, title: '100% Secure', desc: 'Safe & secure payments' },
              { icon: ThumbsUp, title: 'Best Quality', desc: 'Fresh & handpicked' },
              { icon: Clock, title: '24/7 Support', desc: 'Always here to help' }
            ].map((Feature, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-3 md:p-4 rounded-2xl flex items-center gap-3 md:gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 cursor-pointer"
              >
                <div className="bg-primary/10 p-2 md:p-3 rounded-full text-primary shrink-0">
                  <Feature.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs md:text-sm leading-tight">{Feature.title}</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">{Feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Shop by Category</h2>
            <Link to="/all-items" className="text-sm font-bold text-primary flex items-center">
              See all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link key={i} to={`/all-items?category=${cat.name}`} className="flex flex-col items-center group cursor-pointer">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-1.5 md:p-2 group-hover:shadow-md transition-shadow"
                >
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply" />
                </motion.div>
                <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Horizontal Scrolling Section - Vegetables */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Fresh Vegetables</h2>
          </div>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4 px-1 -mx-1 pr-6">
            {FRESH_VEGS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            <div className="flex-shrink-0 flex items-center justify-center p-4 min-w-[120px]">
              <Link to="/all-items?category=Vegetables" className="flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ChevronRight size={24} />
                </div>
                <span className="text-sm font-bold">See all</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Horizontal Scrolling Section - Snacks */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Munchies & Snacks</h2>
          </div>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4 px-1 -mx-1 pr-6">
            {SNACKS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            <div className="flex-shrink-0 flex items-center justify-center p-4 min-w-[120px]">
              <Link to="/all-items?category=Snacks" className="flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ChevronRight size={24} />
                </div>
                <span className="text-sm font-bold">See all</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Horizontal Scrolling Section - Bestsellers */}
        <section className="mb-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Our Bestsellers</h2>
          </div>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4 px-1 -mx-1 pr-6">
            {BESTSELLERS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            <div className="flex-shrink-0 flex items-center justify-center p-4 min-w-[120px]">
              <Link to="/all-items" className="flex flex-col items-center gap-2 text-primary hover:text-primary/80 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ChevronRight size={24} />
                </div>
                <span className="text-sm font-bold">See all</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
