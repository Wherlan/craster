// Local Storage Based Backend Service
// Handles all data persistence and business logic

const STORAGE_KEYS = {
  USERS: 'giveaway_users',
  CURRENT_USER: 'giveaway_current_user',
  GIVEAWAYS: 'giveaway_items',
  ENTRIES: 'giveaway_entries',
  TRANSACTIONS: 'giveaway_transactions',
  WINNERS: 'giveaway_winners',
};

// Initialize default giveaway items
const DEFAULT_GIVEAWAYS = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: 'Latest Apple flagship smartphone',
    image: '/images/iphone15.webp',
    value: 1299,
    entries: 0,
    totalParticipants: 2543,
    drawDate: '2026-02-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    description: 'M3 Max processor with 48GB RAM',
    image: '/images/macbook16.jpg',
    value: 3499,
    entries: 0,
    totalParticipants: 1876,
    drawDate: '2026-02-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Apple Watch Ultra',
    description: 'Premium smartwatch with action button',
    image: '/images/AppleWatch.jpg',
    value: 799,
    entries: 0,
    totalParticipants: 5234,
    drawDate: '2026-02-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation',
    image: '/images/sonyheadphones.jpg',
    value: 399,
    entries: 0,
    totalParticipants: 8932,
    drawDate: '2026-02-12',
    status: 'active'
  },
  {
    id: '5',
    name: 'DJI Air 3S Drone',
    description: '4K camera drone with 46-min flight time',
    image: '/images/djidrone.jpg',
    value: 1299,
    entries: 0,
    totalParticipants: 1243,
    drawDate: '2026-02-25',
    status: 'active'
  },
  {
    id: '6',
    name: 'GoPro Hero 12',
    description: 'Professional action camera',
    image: '/images/goprohero12.jpg',
    value: 499,
    entries: 0,
    totalParticipants: 3421,
    drawDate: '2026-03-01',
    status: 'active'
  },
  {
    id: '7',
    name: 'Xbox Series X',
    description: 'Next-gen gaming console',
    image: '/images/xboxseriesx.jpg',
    value: 499,
    entries: 0,
    totalParticipants: 4156,
    drawDate: '2026-03-05',
    status: 'active'
  },
  {
    id: '8',
    name: 'Nintendo Switch OLED',
    description: 'Premium gaming handheld console',
    image: '/images/nintendoswitcholed.jpg',
    value: 349,
    entries: 0,
    totalParticipants: 5890,
    drawDate: '2026-03-10',
    status: 'active'
  },
];

// ==================== Authentication ====================

export const authService = {
  // Initialize storage with default data if empty
  initialize: () => {
    if (!localStorage.getItem(STORAGE_KEYS.GIVEAWAYS)) {
      localStorage.setItem(STORAGE_KEYS.GIVEAWAYS, JSON.stringify(DEFAULT_GIVEAWAYS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      // Create demo account
      const demoUser = {
        'alex.rodriguez@corporate.com': {
          id: 'user_demo',
          email: 'alex.rodriguez@corporate.com',
          fullName: 'Alex Rodriguez',
          password: btoa('SecurePass2026'),
          createdAt: new Date().toISOString(),
          kycVerified: false,
          balance: 0,
          totalWinnings: 0,
          entriesCount: 0,
        }
      };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(demoUser));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENTRIES)) {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WINNERS)) {
      localStorage.setItem(STORAGE_KEYS.WINNERS, JSON.stringify([]));
    }
  },

  signup: (email, password, fullName) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || {};
    
    if (users[email]) {
      return { success: false, message: 'Email already registered' };
    }

    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      email,
      fullName,
      password: btoa(password), // Basic encoding (not secure, for demo only)
      createdAt: new Date().toISOString(),
      kycVerified: false,
      balance: 0,
      totalWinnings: 0,
      entriesCount: 0,
    };

    users[email] = newUser;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Auto-login after signup
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || {};
    const user = users[email];

    if (!user || user.password !== btoa(password)) {
      return { success: false, message: 'Invalid email or password' };
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true, user };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return { success: true };
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  },

  updateUserProfile: (userId, updates) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || {};
    let updated = false;

    for (let email in users) {
      if (users[email].id === userId) {
        users[email] = { ...users[email], ...updates };
        updated = true;

        // Update current user if it's the logged-in user
        const currentUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (currentUser) {
          const cu = JSON.parse(currentUser);
          if (cu.id === userId) {
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(users[email]));
          }
        }
        break;
      }
    }

    if (updated) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      return { success: true, user: users[Object.keys(users).find(e => users[e].id === userId)] };
    }
    return { success: false, message: 'User not found' };
  },
};

// ==================== Giveaway Management ====================

export const giveawayService = {
  getAllGiveaways: () => {
    const giveaways = JSON.parse(localStorage.getItem(STORAGE_KEYS.GIVEAWAYS)) || DEFAULT_GIVEAWAYS;
    return giveaways;
  },

  getGiveawayById: (id) => {
    const giveaways = JSON.parse(localStorage.getItem(STORAGE_KEYS.GIVEAWAYS)) || [];
    return giveaways.find(g => g.id === id) || null;
  },

  createGiveaway: (giveawayData) => {
    const giveaways = JSON.parse(localStorage.getItem(STORAGE_KEYS.GIVEAWAYS)) || [];
    const newGiveaway = {
      id: `giveaway_${Date.now()}`,
      ...giveawayData,
      createdAt: new Date().toISOString(),
      entries: 0,
      totalParticipants: 0,
      status: 'active'
    };

    giveaways.push(newGiveaway);
    localStorage.setItem(STORAGE_KEYS.GIVEAWAYS, JSON.stringify(giveaways));
    return { success: true, giveaway: newGiveaway };
  },
};

// ==================== Giveaway Entries ====================

export const entryService = {
  enterGiveaway: (userId, giveawayId, entryCount = 1) => {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENTRIES)) || [];
    const giveaway = giveawayService.getGiveawayById(giveawayId);

    if (!giveaway) {
      return { success: false, message: 'Giveaway not found' };
    }

    // Check for existing entry
    const existingEntry = entries.find(e => e.userId === userId && e.giveawayId === giveawayId);

    if (existingEntry) {
      existingEntry.entryCount += entryCount;
      existingEntry.updatedAt = new Date().toISOString();
    } else {
      entries.push({
        id: `entry_${Date.now()}`,
        userId,
        giveawayId,
        entryCount,
        createdAt: new Date().toISOString(),
        status: 'active'
      });
    }

    // Update giveaway participant count
    const giveaways = JSON.parse(localStorage.getItem(STORAGE_KEYS.GIVEAWAYS)) || [];
    const giveawayIndex = giveaways.findIndex(g => g.id === giveawayId);
    if (giveawayIndex !== -1) {
      giveaways[giveawayIndex].totalParticipants += entryCount;
      localStorage.setItem(STORAGE_KEYS.GIVEAWAYS, JSON.stringify(giveaways));
    }

    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));

    // Create transaction record
    transactionService.createTransaction(userId, 'entry', giveawayId, entryCount);

    // Update user entry count
    const user = authService.getCurrentUser();
    if (user && user.id === userId) {
      authService.updateUserProfile(userId, { entriesCount: (user.entriesCount || 0) + entryCount });
    }

    return { success: true, entry: existingEntry || entries[entries.length - 1] };
  },

  getUserEntries: (userId) => {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENTRIES)) || [];
    return entries.filter(e => e.userId === userId);
  },

  getGiveawayEntries: (giveawayId) => {
    const entries = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENTRIES)) || [];
    return entries.filter(e => e.giveawayId === giveawayId);
  },
};

// ==================== Transactions ====================

export const transactionService = {
  createTransaction: (userId, type, giveawayId, amount) => {
    const transactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) || [];

    const transaction = {
      id: `txn_${Date.now()}`,
      userId,
      type, // 'entry', 'withdrawal', 'refund'
      giveawayId,
      amount,
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    transactions.push(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));

    return transaction;
  },

  getUserTransactions: (userId) => {
    const transactions = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) || [];
    return transactions.filter(t => t.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  getTransactionStats: (userId) => {
    const transactions = transactionService.getUserTransactions(userId);
    const stats = {
      totalEntries: transactions.filter(t => t.type === 'entry').reduce((sum, t) => sum + t.amount, 0),
      totalWithdrawals: transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0),
      totalRefunds: transactions.filter(t => t.type === 'refund').reduce((sum, t) => sum + t.amount, 0),
      transactionCount: transactions.length,
    };
    return stats;
  },
};

// ==================== Winners ====================

export const winnerService = {
  recordWinner: (userId, giveawayId) => {
    const winners = JSON.parse(localStorage.getItem(STORAGE_KEYS.WINNERS)) || [];

    const winner = {
      id: `winner_${Date.now()}`,
      userId,
      giveawayId,
      winDate: new Date().toISOString(),
      claimed: false
    };

    winners.push(winner);
    localStorage.setItem(STORAGE_KEYS.WINNERS, JSON.stringify(winners));

    // Update user winnings
    const user = authService.getCurrentUser();
    if (user && user.id === userId) {
      const giveaway = giveawayService.getGiveawayById(giveawayId);
      const newTotalWinnings = (user.totalWinnings || 0) + (giveaway?.value || 0);
      authService.updateUserProfile(userId, { totalWinnings: newTotalWinnings });
    }

    return winner;
  },

  getUserWinners: (userId) => {
    const winners = JSON.parse(localStorage.getItem(STORAGE_KEYS.WINNERS)) || [];
    return winners.filter(w => w.userId === userId);
  },

  getGiveawayWinner: (giveawayId) => {
    const winners = JSON.parse(localStorage.getItem(STORAGE_KEYS.WINNERS)) || [];
    return winners.find(w => w.giveawayId === giveawayId) || null;
  },

  claimWinner: (winnerId) => {
    const winners = JSON.parse(localStorage.getItem(STORAGE_KEYS.WINNERS)) || [];
    const winner = winners.find(w => w.id === winnerId);

    if (winner) {
      winner.claimed = true;
      winner.claimedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.WINNERS, JSON.stringify(winners));
      return { success: true, winner };
    }

    return { success: false, message: 'Winner not found' };
  },
};

// Initialize on module load
authService.initialize();
