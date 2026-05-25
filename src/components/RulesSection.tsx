import React, { useState } from 'react';
import { ShieldAlert, LogOut, Coffee, Clock, Sparkles } from 'lucide-react';
import { LOUNGE_RULES } from '../types';

export default function RulesSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'behavior' | 'gaming' | 'amenities'>('all');

  const filteredRules = activeTab === 'all' 
    ? LOUNGE_RULES 
    : LOUNGE_RULES.filter((rule) => rule.category === activeTab);

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
        return <ShieldAlert className="w-6 h-6 text-brand-primary" />;
      case 2:
        return <Coffee className="w-6 h-6 text-brand-secondary" />;
      case 3:
        return <LogOut className="w-6 h-6 text-cyan-600" />;
      case 4:
        return <Clock className="w-6 h-6 text-brand-tertiary" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-primary" />;
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 card-neo" id="rules">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="font-headline-md text-2xl uppercase tracking-tight italic border-l-4 border-brand-primary pl-2 mb-1">
            Lounge Rules
          </h3>
          <p className="text-sm text-brand-dark/70">Ensuring premium gameplay for everyone</p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'behavior', 'gaming', 'amenities'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-all border ${
                activeTab === tab
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-brand-surface text-brand-dark hover:bg-brand-dark/5 border-neutral-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="flex gap-4 p-4 rounded-lg bg-brand-surface border border-neutral-200 hover:border-brand-dark transition-all duration-200"
          >
            <div className="flex-shrink-0 bg-white p-2 border-2 border-brand-dark rounded shadow-[2px_2px_0px_#1b1b1b] self-start">
              {getIcon(rule.id)}
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-base uppercase tracking-tight mb-1">
                {rule.title}
              </h4>
              <p className="text-sm text-brand-dark/80 leading-relaxed">
                {rule.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
