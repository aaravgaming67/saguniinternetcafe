import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ListOrdered, 
  ShieldCheck, 
  Tv, 
  Copy, 
  Check, 
  User, 
  Menu,
  X,
  Sparkles,
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingSlot } from './types';
import BookingForm from './components/BookingForm';
import LiveSlots from './components/LiveSlots';
import RulesSection from './components/RulesSection';

// Initial sample slot matching user screen mockups exactly on first launch
const INITIAL_SLOT: BookingSlot = {
  id: '#SG-8821',
  fullName: 'Karan Sharma',
  phone: '+91 98765 43210',
  setupType: 'pc',
  setupName: 'Performance PC',
  game: 'VALORANT',
  date: '2026-10-24',
  time: '18:00',
  duration: 2,
  players: 1,
  estimatedTotal: 240,
  requests: 'Performance mechanical keyboard option',
  status: 'CONFIRMED',
  createdAt: '2026-05-25T08:19:33Z',
};

export default function App() {
  const [slots, setSlots] = useState<BookingSlot[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Book' | 'Stations' | 'Visit'>('Book');

  // Load bookings on mount
  useEffect(() => {
    const saved = localStorage.getItem('saguni_bookings');
    if (saved) {
      try {
        setSlots(JSON.parse(saved));
      } catch (e) {
        setSlots([INITIAL_SLOT]);
      }
    } else {
      setSlots([INITIAL_SLOT]);
      localStorage.setItem('saguni_bookings', JSON.stringify([INITIAL_SLOT]));
    }
  }, []);

  // Show Toast Utility
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    // Auto-dismiss inside 4 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add new Booking Slot
  const handleAddBookingSlot = (newSlot: BookingSlot) => {
    const updated = [newSlot, ...slots];
    setSlots(updated);
    localStorage.setItem('saguni_bookings', JSON.stringify(updated));
    triggerToast(`Booking Confirmed! Code: ${newSlot.id}`);
  };

  // Cancel/Delete Slot
  const handleDeleteSlot = (id: string) => {
    const updated = slots.filter(s => s.id !== id);
    setSlots(updated);
    localStorage.setItem('saguni_bookings', JSON.stringify(updated));
    triggerToast(`Cancelled session ${id}`);
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-brand-surface min-h-screen text-brand-dark selection:bg-brand-primary selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="bg-white sticky top-0 z-50 border-b-2 border-brand-dark">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('top')} 
            className="font-black text-2xl tracking-tighter italic cursor-pointer select-none hover:text-brand-primary transition-colors flex items-center gap-1"
          >
            <span className="text-brand-primary">SAGUNI</span> GAMING CAFE
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex gap-6 items-center">
            <button
              onClick={() => {
                setActiveTab('Stations');
                scrollToSection('rates-sheet');
              }}
              className={`font-semibold text-xs uppercase tracking-widest transition-colors ${
                activeTab === 'Stations'
                  ? 'text-brand-primary border-b-2 border-brand-primary pb-1'
                  : 'text-brand-dark hover:text-brand-primary'
              }`}
            >
              Stations
            </button>
            <button
              onClick={() => {
                setActiveTab('Book');
                scrollToSection('book');
              }}
              className={`font-semibold text-xs uppercase tracking-widest transition-colors ${
                activeTab === 'Book'
                  ? 'text-brand-primary border-b-2 border-brand-primary pb-1'
                  : 'text-brand-dark hover:text-brand-primary'
              }`}
            >
              Book
            </button>
            <button
              onClick={() => {
                setActiveTab('Visit');
                scrollToSection('visit');
              }}
              className={`font-semibold text-xs uppercase tracking-widest transition-colors ${
                activeTab === 'Visit'
                  ? 'text-brand-primary border-b-2 border-brand-primary pb-1'
                  : 'text-brand-dark hover:text-brand-primary'
              }`}
            >
              Visit
            </button>
            <button 
              onClick={() => scrollToSection('book')}
              className="bg-brand-primary text-white px-5 py-2 hover:bg-brand-primary-container font-black uppercase text-xs tracking-wider transition-all rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-y-[1px] cursor-pointer"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            className="md:hidden p-2 text-brand-dark hover:text-brand-primary transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t-2 border-brand-dark bg-white"
            >
              <div className="p-4 flex flex-col gap-4">
                <button
                  onClick={() => {
                    setActiveTab('Stations');
                    scrollToSection('rates-sheet');
                  }}
                  className="text-left font-bold text-sm uppercase tracking-wider text-brand-dark py-2 border-b border-brand-surface"
                >
                  ⚡ Stations & Arsenal
                </button>
                <button
                  onClick={() => {
                    setActiveTab('Book');
                    scrollToSection('book');
                  }}
                  className="text-left font-bold text-sm uppercase tracking-wider text-brand-dark py-2 border-b border-brand-surface"
                >
                  🎖️ Reservation System
                </button>
                <button
                  onClick={() => {
                    setActiveTab('Visit');
                    scrollToSection('visit');
                  }}
                  className="text-left font-bold text-sm uppercase tracking-wider text-brand-dark py-2 border-b border-brand-surface"
                >
                  📍 Visit Thane Cafe
                </button>
                <button
                  onClick={() => scrollToSection('rules')}
                  className="text-left font-bold text-sm uppercase tracking-wider text-brand-dark py-2"
                >
                  📋 Lounge Rules
                </button>
                <button 
                  onClick={() => scrollToSection('book')}
                  className="bg-brand-primary text-white w-full py-3 font-bold uppercase text-xs text-center tracking-widest rounded card-neo"
                >
                  BOOK NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative md:h-[80vh] min-h-[550px] flex items-center overflow-hidden">
        {/* Real gaming background image hotlinked */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwyMpPNA5GiMSSx9Xmym7xpE3RWWCG4xozE7WGqs6E47JPJi5okruyNpbbqoPMHmegU2SBhhhjBMZdTjz1qDeDM9rlhl8rzubDCc9XygC-FBwTsl4ucasTjTpqBlcBEcy7yNafvWogwLRyGN87v2f0AmM8wOUZGeTC4mKpf0B2lSa6rFZ3rQwXT3riAvS7-8xFdHZt2S-59ZJVu6z0TKoWTAMekxBi1y3-Qk8ktV0cKHo9-evMmQbsIMl-ATlK5mDJlh6ghRotERc')" 
          }}
        />
        {/* Gritty high-impact overlay gradient from design */}
        <div className="absolute inset-0 hero-gradient" />

        <div className="relative w-full max-w-7xl mx-auto px-6 py-16 z-10">
          <div className="max-w-2xl">
            <span className="inline-block bg-brand-tertiary text-brand-dark px-3 py-1 font-black text-xs uppercase tracking-widest mb-4 rounded-md shadow-[2px_2px_0px_#1b1b1b]">
              Elite Performance
            </span>
            <h1 className="font-headline-lg text-5xl md:text-8xl font-black text-white leading-none mb-6 italic tracking-tighter">
              PREMIUM GAMING.
            </h1>
            <p className="text-base md:text-xl text-neutral-300 max-w-lg mb-8 leading-relaxed font-normal">
              Experience elite performance at Saguni Gaming Cafe, Thane's dedicated PC &amp; PS5 lounge. Built for gamers, by gamers. Low latency, high refresh rates, and the ultimate squad experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('book')}
                className="bg-brand-primary text-white px-8 py-4 font-black uppercase text-base tracking-tight card-neo inline-block cursor-pointer select-none"
              >
                Secure a Station
              </button>
              <button 
                onClick={() => scrollToSection('rates-sheet')}
                className="bg-white text-brand-dark px-8 py-4 font-black uppercase text-base tracking-tight card-neo inline-block cursor-pointer select-none"
              >
                View Arsenal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reservation & Details Content Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto" id="book">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Booking Form (Left Column, takes 7 columns on desktop) */}
          <div className="lg:col-span-7">
            <BookingForm 
              onAddBookingSlot={handleAddBookingSlot}
              showToast={triggerToast}
            />
          </div>

          {/* Side Panels: Rate Sheet, Elite Arsenal Photo, Visit Info (Right Column, takes 5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Rate Sheet (Pricing Info Card) */}
            <div id="rates-sheet" className="bg-white p-6 md:p-8 card-neo border-brand-primary">
              <div className="flex items-center justify-between mb-6 border-b-2 border-brand-dark pb-3">
                <h3 className="font-headline-md text-2xl uppercase tracking-tighter font-black">
                  Rate Sheet
                </h3>
                <span className="bg-brand-primary/10 text-brand-primary px-2.5 py-0.5 font-bold text-xs uppercase tracking-wider rounded border border-brand-primary">
                  Pricing list
                </span>
              </div>
              
              <div className="space-y-4">
                {/* Product 1 */}
                <div className="flex justify-between items-center p-4 bg-brand-surface border-l-4 border-brand-primary rounded">
                  <div>
                    <div className="font-bold text-lg text-brand-dark">Performance PC</div>
                    <div className="text-xs text-brand-dark/70 font-medium">RTX 40 Series + 240Hz Gaming Monitors</div>
                  </div>
                  <div className="font-black text-xl text-brand-dark whitespace-nowrap">Rs 120/hr</div>
                </div>

                {/* Product 2 */}
                <div className="flex justify-between items-center p-4 bg-brand-surface border-l-4 border-emerald-600 rounded">
                  <div>
                    <div className="font-bold text-lg text-brand-dark">PS5 Bay</div>
                    <div className="text-xs text-brand-dark/70 font-medium font-sans">4K OLED + DualSense Wireless</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-lg text-brand-dark whitespace-nowrap">Rs 100/hr <span className="text-xs text-brand-dark/50 font-normal underline">(1P)</span></div>
                    <div className="font-black text-sm text-brand-primary whitespace-nowrap mt-0.5">Rs 180/hr <span className="text-xs text-brand-dark/50 font-normal underline">(2P)</span></div>
                  </div>
                </div>

                {/* Product 3 */}
                <div className="flex justify-between items-center p-4 bg-brand-dark text-white border-l-4 border-brand-tertiary rounded">
                  <div>
                    <div className="font-bold text-lg text-[#f3f3f3]">Squad Block</div>
                    <div className="text-xs text-[#dddddd]/70 font-medium">Private Squad Cabin (Up to 5 players)</div>
                  </div>
                  <div className="font-black text-xl text-brand-tertiary whitespace-nowrap">Rs 400/hr</div>
                </div>
              </div>
            </div>

            {/* Static Interactive Aesthetic Photo Panel */}
            <div className="relative h-64 overflow-hidden card-neo group rounded-md">
              <img 
                alt="Saguni Games Station" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwyMpPNA5GiMSSx9Xmym7xpE3RWWCG4xozE7WGqs6E47JPJi5okruyNpbbqoPMHmegU2SBhhhjBMZdTjz1qDeDM9rlhl8rzubDCc9XygC-FBwTsl4ucasTjTpqBlcBEcy7yNafvWogwLRyGN87v2f0AmM8wOUZGeTC4mKpf0B2lSa6rFZ3rQwXT3riAvS7-8xFdHZt2S-59ZJVu6z0TKoWTAMekxBi1y3-Qk8ktV0cKHo9-evMmQbsIMl-ATlK5mDJlh6ghRotERc"
              />
              <div className="absolute inset-0 bg-[#b6170e]/20 transition-colors group-hover:bg-transparent duration-300" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-brand-dark text-white text-xl font-black uppercase px-4 py-2 rotate-[-2deg] tracking-wider shadow-[3px_3px_0px_#ebea00] border border-white">
                  Elite Arsenal
                </span>
              </div>
            </div>

            {/* Visit Saguni Gaming Cafe (Contact & Details) */}
            <div id="visit" className="bg-white p-6 md:p-8 card-neo rounded-md">
              <h3 className="font-headline-md text-2xl uppercase tracking-tighter mb-6 border-b border-brand-surface pb-3 font-black">
                Visit Saguni Gaming Cafe
              </h3>
              <div className="grid grid-cols-1 gap-5">
                
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-brand-surface border border-brand-dark rounded shrink-0">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-brand-dark text-base">Thane, Maharashtra</div>
                    <div className="text-sm text-brand-dark/70">Near Viviana Mall, Thane West, pin: 400606</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-brand-surface border border-brand-dark rounded shrink-0">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-brand-dark text-base">Call Support</div>
                    <div className="text-sm text-brand-dark/70">+91 00000 00000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-brand-surface border border-brand-dark rounded shrink-0">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-brand-dark text-base">Bookings & Questions</div>
                    <div className="text-sm text-brand-dark/70">bookings@sagunigaming.in</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Your Slots Tracker Section (Stored Bookings list) */}
      <section className="bg-brand-surface border-t-2 border-brand-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-headline-lg text-3xl uppercase italic tracking-tight border-l-8 border-brand-primary pl-4 mb-2 font-black">
                Your Slots
              </h2>
              <p className="text-brand-dark/70 text-sm">
                Recently configured gaming sessions at Saguni. Keep or presentation code to showcase at our front counter.
              </p>
            </div>
            
            <span className="text-xs bg-brand-dark text-white font-mono px-3 py-1 border border-brand-dark rounded-md self-start md:self-auto">
              🎮 {slots.length} ACTIVE RESERVATIONS
            </span>
          </div>

          <LiveSlots 
            slots={slots}
            onDeleteSlot={handleDeleteSlot}
            showToast={triggerToast}
          />
        </div>
      </section>

      {/* Interactive Rules Section */}
      <section className="bg-white border-t-2 border-brand-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <RulesSection />
        </div>
      </section>

      {/* Footer Element from design spec */}
      <footer className="bg-brand-dark text-[#c1c6d5] border-t-2 border-brand-dark">
        <div className="flex flex-col md:flex-row justify-between items-start w-full px-6 py-12 max-w-7xl mx-auto gap-8">
          
          <div className="space-y-4 max-w-sm">
            <div className="font-headline-md text-2xl font-black italic tracking-tighter text-white">
              SAGUNI GAMING CAFE
            </div>
            <p className="text-[#a4aab9] text-sm leading-relaxed">
              Thane's premiere destination for elite-tier PC and PS5 gaming. Empowering squads in Mumbai Metropolitan Area with 240Hz frame rates, custom responsive keyboards, and zero lag.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-widest text-[#eeeeee]">Lounge Map</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection('rates-sheet')} className="text-[#a4aab9] hover:text-brand-tertiary transition-colors hover:underline text-left">
                    Gaming Stations
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('book')} className="text-[#a4aab9] hover:text-brand-tertiary transition-colors hover:underline text-left">
                    Book Now
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('rules')} className="text-[#a4aab9] hover:text-brand-tertiary transition-colors hover:underline text-left">
                    Lounge Rules
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-widest text-[#eeeeee]">Support Channels</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#visit" className="text-[#a4aab9] hover:text-brand-tertiary transition-colors hover:underline">
                    Contact Support
                  </a>
                </li>
                <li>
                  <button onClick={() => triggerToast('Privacy Policy modal under construction')} className="text-[#a4aab9] hover:text-brand-tertiary transition-colors hover:underline text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => triggerToast('Terms of Service: We play hard but play fair')} className="text-[#a4aab9] hover:text-brand-tertiary transition-colors hover:underline text-left">
                    Terms of Battle
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Outer credit lines */}
        <div className="max-w-7xl mx-auto px-6 py-6 border-t border-brand-dark/20 flex flex-col sm:flex-row justify-between items-center bg-brand-dark text-xs gap-4 text-[#a4aab9]">
          <p className="text-[#a4aab9]">
            © 2026 SAGUNI Gaming Cafe. All rights reserved. Built for Elite Performance.
          </p>
          <div className="flex gap-4 items-center">
            <span className="cursor-pointer hover:text-white transition-colors">🎮 PC Lobbies</span>
            <span className="text-[#414753]">|</span>
            <span className="cursor-pointer hover:text-white transition-colors">📺 CO-OP Bays</span>
          </div>
        </div>
      </footer>

      {/* High-Contrast Beautiful Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100]"
          >
            <div className="bg-brand-dark text-[#f3f3f3] px-6 py-4 card-neo flex items-center gap-3 rounded-md max-w-md shadow-2xl">
              <span className="p-1.5 bg-brand-primary/20 rounded-full shrink-0">
                <Check className="w-5 h-5 text-brand-tertiary" />
              </span>
              <span className="font-extrabold text-[#eeeeee] text-xs uppercase tracking-widest leading-none">
                {toastMessage}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
