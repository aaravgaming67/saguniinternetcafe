export interface BookingSlot {
  id: string; // e.g. #SG-8821
  fullName: string;
  phone: string;
  setupType: 'pc' | 'ps5' | 'squad';
  setupName: string;
  game: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // in hours
  players: number;
  estimatedTotal: number;
  requests: string;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

export interface SetupOption {
  id: 'pc' | 'ps5' | 'squad';
  name: string;
  description: string;
  baseRate: number; // rate per hour
  isMultiplayerDependent?: boolean; // PS5 has 1P (100) vs 2P (180) logic
}

export const SETUP_OPTIONS: SetupOption[] = [
  {
    id: 'pc',
    name: 'Performance PC',
    description: 'RTX 40 Series + 240Hz',
    baseRate: 120,
  },
  {
    id: 'ps5',
    name: 'PS5 Bay',
    description: '4K OLED + DualSense',
    baseRate: 100, // 1P is 100, 2P is 180
    isMultiplayerDependent: true,
  },
  {
    id: 'squad',
    name: 'Squad Block',
    description: 'Private Zone (Up to 5)',
    baseRate: 400,
  },
];

export const POPULAR_GAMES = [
  'Valorant',
  'FC24',
  'GTA V',
  'CS:GO 2',
  'Spider-Man 2',
  'FIFA 23',
  'Elden Ring',
  'Dota 2',
];

export interface LoungeRule {
  id: number;
  title: string;
  description: string;
  category: 'behavior' | 'gaming' | 'amenities';
}

export const LOUNGE_RULES: LoungeRule[] = [
  {
    id: 1,
    title: 'Fair Play Only',
    description: 'No hacking, cheating, or toxic behaviour in multiplayer lobbies. Be respectful to fellow gamers.',
    category: 'behavior',
  },
  {
    id: 2,
    title: 'Food & Beverage Protection',
    description: 'Keep drinks securely in cup holders. Avoid touching peripherals with greasy fingers.',
    category: 'amenities',
  },
  {
    id: 3,
    title: 'Account Integrity',
    description: 'Always log out of your personal Steam, Epic, or Discord accounts before leaving your station.',
    category: 'gaming',
  },
  {
    id: 4,
    title: 'Time & Extensions',
    description: 'Notify the admin desk 15 minutes before your slot expires if you wish to extend your session.',
    category: 'gaming',
  },
];
