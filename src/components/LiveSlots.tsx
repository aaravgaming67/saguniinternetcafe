import React from 'react';
import { Verified, Copy, Check, Trash2, Calendar, Gamepad, User, Users, Clipboard } from 'lucide-react';
import { BookingSlot } from '../types';

interface LiveSlotsProps {
  slots: BookingSlot[];
  onDeleteSlot: (id: string) => void;
  showToast: (message: string) => void;
}

export default function LiveSlots({ slots, onDeleteSlot, showToast }: LiveSlotsProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyCode = (id: string) => {
    navigator.clipboard.writeText(id).then(
      () => {
        setCopiedId(id);
        showToast(`Code ${id} copied to clipboard!`);
        setTimeout(() => setCopiedId(null), 2000);
      },
      () => {
        // Fallback for iframe restrictions
        setCopiedId(id);
        showToast(`Code is ${id}`);
        setTimeout(() => setCopiedId(null), 2000);
      }
    );
  };

  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render Slots */}
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white p-6 card-neo border-t-8 border-t-brand-primary flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-black text-2xl tracking-tighter text-brand-dark flex items-center gap-1.5">
                    {slot.id}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 inline-block mt-0.5">
                    Confirmed
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onDeleteSlot(slot.id)}
                    className="p-1 px-1.5 text-neutral-400 hover:text-brand-primary hover:bg-neutral-100 rounded transition-all"
                    title="Cancel reservation"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <span className="p-1 bg-brand-primary/10 rounded-full inline-block">
                    <Verified className="w-5 h-5 text-brand-primary" />
                  </span>
                </div>
              </div>

              {/* Booking Info Fields */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm py-1 border-b border-brand-surface">
                  <span className="text-brand-dark/65 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> Gamer
                  </span>
                  <span className="font-bold text-brand-dark max-w-[150px] truncate">
                    {slot.fullName}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm py-1 border-b border-brand-surface">
                  <span className="text-brand-dark/65 flex items-center gap-1 font-medium">
                    🎛️ Setup
                  </span>
                  <span className="font-bold uppercase text-brand-dark">
                    {slot.setupName}
                  </span>
                </div>

                <div className="flex justify-between text-sm py-1 border-b border-brand-surface">
                  <span className="text-brand-dark/65 flex items-center gap-1 font-medium">
                    <Gamepad className="w-3.5 h-3.5" /> Game
                  </span>
                  <span className="font-bold uppercase text-brand-primary">
                    {slot.game}
                  </span>
                </div>

                <div className="flex justify-between text-sm py-1 border-b border-brand-surface">
                  <span className="text-brand-dark/65 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" /> Time Slot
                  </span>
                  <span className="font-bold text-brand-dark">
                    {formatDate(slot.date)}, {slot.time} ({slot.duration}h)
                  </span>
                </div>

                <div className="flex justify-between text-sm py-1 border-b border-brand-surface">
                  <span className="text-brand-dark/65 flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5" /> Team Size
                  </span>
                  <span className="font-bold text-brand-dark">
                    {slot.players} Player(s)
                  </span>
                </div>

                {slot.requests && (
                  <div className="bg-brand-surface p-2 rounded text-xs text-brand-dark/80 border border-neutral-200 mt-2">
                    <span className="font-bold text-[10px] uppercase text-brand-dark/60 block mb-0.5">Note:</span>
                    {slot.requests}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs text-brand-dark/60 border-t border-brand-surface pt-2 mb-2 font-mono">
                <span>ESTIMATED PAYABLE</span>
                <span className="font-bold text-brand-dark text-sm">Rs {slot.estimatedTotal}</span>
              </div>
              <button
                onClick={() => handleCopyCode(slot.id)}
                className="w-full py-2.5 border-2 border-brand-dark font-bold text-xs uppercase hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer rounded shadow-[2px_2px_0px_#1b1b1b]"
              >
                {copiedId === slot.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" /> COPIED!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> COPY CODE
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Dynamic Placeholder card when slots list matches the UI exactly */}
        <div className="bg-brand-surface border-2 border-dashed border-neutral-300 p-10 flex flex-col items-center justify-center text-center opacity-70 rounded-md min-h-[320px]">
          <span className="p-3 bg-neutral-100 rounded-full mb-4">
            <Clipboard className="w-8 h-8 text-neutral-400" />
          </span>
          <p className="font-bold uppercase text-xs tracking-wider text-neutral-500">
            No previous slots found
          </p>
          <span className="text-xs text-brand-dark/50 mt-1 max-w-[200px]">
            Your newly configured gaming slots will show up here.
          </span>
        </div>
      </div>
    </div>
  );
}
