import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, CheckCircle } from 'lucide-react';
import { BookingSlot, SETUP_OPTIONS, POPULAR_GAMES, SetupOption } from '../types';

interface BookingFormProps {
  onAddBookingSlot: (slot: BookingSlot) => void;
  showToast: (message: string) => void;
}

export default function BookingForm({ onAddBookingSlot, showToast }: BookingFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [setupType, setSetupType] = useState<'pc' | 'ps5' | 'squad'>('pc');
  const [game, setGame] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [players, setPlayers] = useState(1);
  const [requests, setRequests] = useState('');
  const [estimatedTotal, setEstimatedTotal] = useState(120);

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setTime('18:00');
  }, []);

  // Real-time calculation when fields change
  useEffect(() => {
    let price = 0;
    if (setupType === 'pc') {
      price = 120 * duration * players;
    } else if (setupType === 'ps5') {
      if (players <= 1) {
        price = 100 * duration;
      } else {
        price = 180 * duration; // 2P or more logic
      }
    } else if (setupType === 'squad') {
      price = 400 * duration; // flat rate up to 5 players
    }
    setEstimatedTotal(price);
  }, [setupType, duration, players]);

  // Handle auto-capping players to layout limits
  const handleSetupChange = (type: 'pc' | 'ps5' | 'squad') => {
    setSetupType(type);
    if (type === 'ps5') {
      // PS5 is maximum 2 players (co-op)
      if (players > 2) {
        setPlayers(2);
      }
    } else if (type === 'squad') {
      // Squad block is up to 5 players
      if (players < 1) setPlayers(1);
      if (players > 5) setPlayers(5);
    }
  };

  const fillDemoValues = () => {
    setFullName('Karan Sharma');
    setPhone('+91 98765 43210');
    setSetupType('pc');
    setGame('Valorant');
    setDuration(2);
    setPlayers(3);
    setRequests('Mechanical keyboards and hyperX headsets requested.');
    showToast('Demo details filled instantly!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !game.trim() || !date || !time) {
      showToast('Please fill all required fields correctly!');
      return;
    }

    const randomIdNumber = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `#SG-${randomIdNumber}`;

    const selectedSetup = SETUP_OPTIONS.find(s => s.id === setupType);

    const newBooking: BookingSlot = {
      id: bookingCode,
      fullName,
      phone,
      setupType,
      setupName: selectedSetup ? selectedSetup.name : 'Performance PC',
      game,
      date,
      time,
      duration,
      players,
      estimatedTotal,
      requests,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    onAddBookingSlot(newBooking);

    // Reset Form (except some fields for convenience)
    setFullName('');
    setPhone('');
    setGame('');
    setRequests('');
    setDuration(1);
    setPlayers(1);
  };

  return (
    <div className="bg-white p-6 md:p-10 card-neo relative" id="reservation-form">
      {/* Absolute Badge for interactive Play Demo preset */}
      <button
        type="button"
        onClick={fillDemoValues}
        className="absolute top-4 right-4 bg-brand-tertiary text-brand-dark px-3 py-1 font-bold rounded-md text-xs uppercase tracking-wider hover:bg-yellow-400 active:scale-95 transition-all card-neo shadow-[1px_1px_0px_#1b1b1b]"
      >
        ⚡ Fill Demo Inputs
      </button>

      <h2 className="font-headline-lg text-3xl mb-8 uppercase italic border-l-8 border-brand-primary pl-4 tracking-tight flex items-center gap-2">
        Reservation Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name & Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Full Name <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all font-semibold rounded-md outline-none text-brand-dark"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Phone Number <span className="text-brand-primary">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all font-semibold rounded-md outline-none text-brand-dark"
            />
          </div>
        </div>

        {/* Setup Type & Preferred Game */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Setup Type <span className="text-brand-primary">*</span>
            </label>
            <select
              value={setupType}
              onChange={(e) => handleSetupChange(e.target.value as 'pc' | 'ps5' | 'squad')}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all font-bold rounded-md cursor-pointer outline-none text-brand-dark"
            >
              <option value="pc">Performance PC (Rs 120/hr)</option>
              <option value="ps5">PS5 Bay (From Rs 100/hr)</option>
              <option value="squad">Squad Block (Rs 400/hr)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Preferred Game <span className="text-brand-primary">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Valorant, FC24"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all font-semibold rounded-md outline-none text-brand-dark"
            />
          </div>
        </div>

        {/* Popular Games quick chips */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-brand-dark/50 tracking-wider">
            Quick select game:
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_GAMES.map((pGame) => (
              <button
                key={pGame}
                type="button"
                onClick={() => setGame(pGame)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all border ${
                  game === pGame
                    ? 'bg-brand-primary text-white border-brand-primary'
                    : 'bg-brand-surface text-brand-dark hover:bg-neutral-200 border-neutral-300'
                }`}
              >
                {pGame}
              </button>
            ))}
          </div>
        </div>

        {/* Date, Time, Duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Date <span className="text-brand-primary">*</span>
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all rounded-md outline-none text-brand-dark font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Time <span className="text-brand-primary">*</span>
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all rounded-md outline-none text-brand-dark font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Duration (Hours)
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all rounded-md outline-none text-brand-dark font-bold"
            />
          </div>
        </div>

        {/* Players & Estimated Total */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
              Players
            </label>
            <input
              type="number"
              min="1"
              max={setupType === 'ps5' ? 2 : setupType === 'squad' ? 5 : 20}
              value={players}
              onChange={(e) => {
                const requestedVal = parseInt(e.target.value) || 1;
                let finalVal = Math.max(1, requestedVal);
                if (setupType === 'ps5' && finalVal > 2) {
                  finalVal = 2;
                  showToast('PS5 Bay supports max 2 players!');
                } else if (setupType === 'squad' && finalVal > 5) {
                  finalVal = 5;
                  showToast('Squad Block holds max 5 players!');
                }
                setPlayers(finalVal);
              }}
              className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all rounded-md outline-none text-brand-dark font-bold"
            />
            <p className="text-[10px] text-brand-dark/50">
              {setupType === 'ps5'
                ? '* Capped at 2 players. (1 Player = Rs 100/hr, 2 Players = Rs 180/hr)'
                : setupType === 'squad'
                ? '* Flat rate covers up to 5 players.'
                : '* Per player PC charge applies.'}
            </p>
          </div>

          <div className="flex items-end shadow-[3px_3px_0px_#1b1b1b]">
            <div className="w-full bg-brand-dark text-white p-3.5 flex justify-between items-center rounded-md border-2 border-brand-dark">
              <span className="font-semibold text-xs uppercase tracking-widest text-[#eeeeee]">
                Estimated Total
              </span>
              <span className="font-black text-2xl text-brand-tertiary">
                Rs {estimatedTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="space-y-2">
          <label className="block text-xs uppercase font-bold text-brand-dark/70 tracking-widest">
            Special Requests
          </label>
          <textarea
            placeholder="Hardware preference, specific gear, custom mouse, snacks, cooling fan options etc."
            value={requests}
            rows={2}
            onChange={(e) => setRequests(e.target.value)}
            className="w-full bg-brand-surface border-2 border-brand-dark p-3 focus:ring-0 focus:border-brand-primary transition-all rounded-md outline-none text-brand-dark"
          />
        </div>

        {/* Submit Confirm Session button */}
        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-4.5 font-bold text-xl uppercase italic tracking-wider card-neo hover:bg-brand-primary-container hover:text-white transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle className="w-5 h-5 inline" /> Confirm Session
        </button>
      </form>
    </div>
  );
}
