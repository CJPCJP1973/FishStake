export interface Player {
  id: string;
  username: string;
  avatar: string;
  location: string;
  rating: number;
  reviewCount: number;
  lifetimeEarnings: number;
  totalGames: number;
  winRate: number;
  averageRoi: number;
  sharePrice: number;
  totalShares: number;
  availableShares: number;
  bio: string;
  playingStyle: string;
  memberSince: string;
  investorCount: number;
  isVerified: boolean;
  status: 'available' | 'sold_out' | 'playing';
}

export interface ShareOwnership {
  playerId: string;
  investorId: string;
  investorName: string;
  sharesOwned: number;
  purchasePrice: number;
  purchaseDate: string;
}

export interface GameHistory {
  id: string;
  playerId: string;
  date: string;
  tournament: string;
  buyIn: number;
  winnings: number;
  roi: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Review {
  id: string;
  playerId: string;
  investorId: string;
  investorName: string;
  investorAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  role: 'admin' | 'player' | 'investor';
  isMember: boolean;
  membershipExpiry?: string;
  balance: number;
  totalInvested: number;
  totalEarnings: number;
  createdAt: string;
}

export interface Investment {
  id: string;
  investorId: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  shares: number;
  purchasePrice: number;
  totalInvestment: number;
  currentValue: number;
  profit: number;
  roi: number;
  purchaseDate: string;
  status: 'active' | 'sold' | 'pending';
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  description: string;
}

export interface Stats {
  activeInvestors: number;
  totalWinnings: number;
  verifiedPlayers: number;
  averageRoi: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
