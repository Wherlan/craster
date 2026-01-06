# Backend API Documentation

The entire backend is contained in `src/services/backend.js`. It provides a complete localStorage-based API for managing users, giveaways, entries, and transactions.

## 📚 API Overview

### Initialization
```javascript
import { authService, giveawayService, entryService, transactionService, winnerService } from './services/backend';

// Automatically called on module load
authService.initialize();
```

## 🔐 Authentication Service

### `authService.signup(email, password, fullName)`
Creates a new user account.

**Parameters:**
- `email` (string): User email
- `password` (string): Password (min 6 chars recommended)
- `fullName` (string): User's full name

**Returns:**
```javascript
{
  success: boolean,
  message?: string,
  user?: { id, email, fullName, createdAt, ... }
}
```

**Example:**
```javascript
const result = authService.signup('john@example.com', 'password123', 'John Doe');
if (result.success) {
  console.log('Account created:', result.user);
}
```

---

### `authService.login(email, password)`
Authenticates a user and sets current session.

**Parameters:**
- `email` (string): User email
- `password` (string): User password

**Returns:**
```javascript
{
  success: boolean,
  message?: string,
  user?: { ... }
}
```

**Example:**
```javascript
const result = authService.login('john@example.com', 'password123');
if (result.success) {
  console.log('Logged in as:', result.user.email);
}
```

---

### `authService.logout()`
Clears current user session.

**Returns:**
```javascript
{ success: true }
```

**Example:**
```javascript
authService.logout();
```

---

### `authService.getCurrentUser()`
Gets the currently logged-in user.

**Returns:**
```javascript
{
  id: string,
  email: string,
  fullName: string,
  createdAt: string,
  kycVerified: boolean,
  balance: number,
  totalWinnings: number,
  entriesCount: number
} | null
```

**Example:**
```javascript
const user = authService.getCurrentUser();
if (user) {
  console.log(`Logged in as: ${user.fullName}`);
}
```

---

### `authService.isAuthenticated()`
Checks if user is currently logged in.

**Returns:**
```javascript
boolean
```

**Example:**
```javascript
if (authService.isAuthenticated()) {
  console.log('User is logged in');
}
```

---

### `authService.updateUserProfile(userId, updates)`
Updates user profile information.

**Parameters:**
- `userId` (string): User ID
- `updates` (object): Properties to update
  - `fullName?`: string
  - `kycVerified?`: boolean
  - `balance?`: number
  - `totalWinnings?`: number
  - `entriesCount?`: number

**Returns:**
```javascript
{
  success: boolean,
  message?: string,
  user?: { ... }
}
```

**Example:**
```javascript
authService.updateUserProfile('user_123', { 
  kycVerified: true,
  totalWinnings: 5000 
});
```

---

## 🎁 Giveaway Service

### `giveawayService.getAllGiveaways()`
Retrieves all available giveaways.

**Returns:**
```javascript
[
  {
    id: string,
    name: string,
    description: string,
    image: string,
    value: number,
    entries: number,
    totalParticipants: number,
    drawDate: string (ISO),
    status: 'active' | 'completed'
  }
]
```

**Example:**
```javascript
const giveaways = giveawayService.getAllGiveaways();
console.log(`${giveaways.length} giveaways available`);
```

---

### `giveawayService.getGiveawayById(id)`
Gets a specific giveaway by ID.

**Parameters:**
- `id` (string): Giveaway ID

**Returns:**
```javascript
{ ... giveaway object } | null
```

**Example:**
```javascript
const giveaway = giveawayService.getGiveawayById('1');
console.log(`Prize: $${giveaway.value}`);
```

---

### `giveawayService.createGiveaway(giveawayData)`
Creates a new giveaway.

**Parameters:**
- `giveawayData` (object):
  - `name`: string
  - `description`: string
  - `image`: string
  - `value`: number
  - `drawDate`: string (ISO)

**Returns:**
```javascript
{
  success: boolean,
  giveaway?: { ... }
}
```

**Example:**
```javascript
const result = giveawayService.createGiveaway({
  name: 'Gaming Laptop',
  description: 'RTX 4090 Gaming Laptop',
  image: 'laptop',
  value: 3500,
  drawDate: '2026-03-01'
});
```

---

## 📝 Entry Service

### `entryService.enterGiveaway(userId, giveawayId, entryCount)`
Adds user entry to a giveaway. Multiple entries allowed, but updates existing entry.

**Parameters:**
- `userId` (string): User ID
- `giveawayId` (string): Giveaway ID
- `entryCount` (number): Number of entries (default: 1)

**Returns:**
```javascript
{
  success: boolean,
  message?: string,
  entry?: {
    id: string,
    userId: string,
    giveawayId: string,
    entryCount: number,
    createdAt: string,
    updatedAt?: string,
    status: 'active'
  }
}
```

**Example:**
```javascript
const result = entryService.enterGiveaway('user_123', 'giveaway_1', 1);
if (result.success) {
  console.log('Entry recorded:', result.entry);
}
```

---

### `entryService.getUserEntries(userId)`
Gets all entries for a specific user.

**Parameters:**
- `userId` (string): User ID

**Returns:**
```javascript
[
  {
    id: string,
    userId: string,
    giveawayId: string,
    entryCount: number,
    createdAt: string,
    status: 'active'
  }
]
```

**Example:**
```javascript
const entries = entryService.getUserEntries('user_123');
console.log(`User has ${entries.length} entries`);
```

---

### `entryService.getGiveawayEntries(giveawayId)`
Gets all entries for a specific giveaway.

**Parameters:**
- `giveawayId` (string): Giveaway ID

**Returns:**
```javascript
[ ... entry objects ]
```

**Example:**
```javascript
const entries = entryService.getGiveawayEntries('giveaway_1');
const totalEntries = entries.reduce((sum, e) => sum + e.entryCount, 0);
console.log(`Total entries for this giveaway: ${totalEntries}`);
```

---

## 💳 Transaction Service

### `transactionService.createTransaction(userId, type, giveawayId, amount)`
Records a transaction.

**Parameters:**
- `userId` (string): User ID
- `type` (string): 'entry' | 'withdrawal' | 'refund'
- `giveawayId` (string): Giveaway ID
- `amount` (number): Amount

**Returns:**
```javascript
{
  id: string,
  userId: string,
  type: string,
  giveawayId: string,
  amount: number,
  status: 'completed',
  createdAt: string
}
```

---

### `transactionService.getUserTransactions(userId)`
Gets all transactions for a user (sorted by date, newest first).

**Parameters:**
- `userId` (string): User ID

**Returns:**
```javascript
[
  {
    id: string,
    userId: string,
    type: string,
    giveawayId: string,
    amount: number,
    status: 'completed',
    createdAt: string
  }
]
```

**Example:**
```javascript
const transactions = transactionService.getUserTransactions('user_123');
console.log(`${transactions.length} transactions found`);
```

---

### `transactionService.getTransactionStats(userId)`
Gets aggregated transaction statistics for a user.

**Parameters:**
- `userId` (string): User ID

**Returns:**
```javascript
{
  totalEntries: number,
  totalWithdrawals: number,
  totalRefunds: number,
  transactionCount: number
}
```

**Example:**
```javascript
const stats = transactionService.getTransactionStats('user_123');
console.log(`Total entries: ${stats.totalEntries}`);
```

---

## 🏆 Winner Service

### `winnerService.recordWinner(userId, giveawayId)`
Records a user as a winner of a giveaway.

**Parameters:**
- `userId` (string): User ID
- `giveawayId` (string): Giveaway ID

**Returns:**
```javascript
{
  id: string,
  userId: string,
  giveawayId: string,
  winDate: string,
  claimed: boolean
}
```

**Example:**
```javascript
const winner = winnerService.recordWinner('user_123', 'giveaway_1');
console.log('Winner recorded:', winner);
```

---

### `winnerService.getUserWinners(userId)`
Gets all wins for a specific user.

**Parameters:**
- `userId` (string): User ID

**Returns:**
```javascript
[
  {
    id: string,
    userId: string,
    giveawayId: string,
    winDate: string,
    claimed: boolean,
    claimedAt?: string
  }
]
```

**Example:**
```javascript
const wins = winnerService.getUserWinners('user_123');
console.log(`User has ${wins.length} wins`);
```

---

### `winnerService.getGiveawayWinner(giveawayId)`
Gets the winner of a specific giveaway (if any).

**Parameters:**
- `giveawayId` (string): Giveaway ID

**Returns:**
```javascript
{ ... winner object } | null
```

---

### `winnerService.claimWinner(winnerId)`
Marks a win as claimed.

**Parameters:**
- `winnerId` (string): Winner ID

**Returns:**
```javascript
{
  success: boolean,
  message?: string,
  winner?: { ... claimed winner object }
}
```

**Example:**
```javascript
const result = winnerService.claimWinner('winner_123');
if (result.success) {
  console.log('Prize claimed!');
}
```

---

## 💾 Storage Keys

The following localStorage keys are used:

```javascript
{
  USERS: 'giveaway_users',
  CURRENT_USER: 'giveaway_current_user',
  GIVEAWAYS: 'giveaway_items',
  ENTRIES: 'giveaway_entries',
  TRANSACTIONS: 'giveaway_transactions',
  WINNERS: 'giveaway_winners'
}
```

## 🔄 Data Flow Example

```javascript
// 1. User signs up
const signup = authService.signup('user@example.com', 'password', 'John Doe');

// 2. User is automatically logged in
const currentUser = authService.getCurrentUser();
console.log(currentUser.id); // user_xxxxx

// 3. Get all giveaways
const giveaways = giveawayService.getAllGiveaways();

// 4. User enters a giveaway
const entry = entryService.enterGiveaway(currentUser.id, giveaways[0].id, 1);

// 5. User checks their entries
const userEntries = entryService.getUserEntries(currentUser.id);

// 6. Admin records user as winner
const winner = winnerService.recordWinner(currentUser.id, giveaways[0].id);

// 7. User claims prize
const claimed = winnerService.claimWinner(winner.id);

// 8. User logs out
authService.logout();
```

---

## ⚠️ Important Notes

1. **No Encryption**: This is a demo backend. Passwords are base64 encoded, not encrypted.
2. **Browser Storage**: All data is stored in localStorage. No cloud sync.
3. **Single User Session**: Only one user can be logged in at a time.
4. **No Validation**: Minimal input validation. Don't use with sensitive data.
5. **No Rate Limiting**: No protection against spam/abuse.

## 🚀 Integration Example

```javascript
import { authService, giveawayService, entryService } from './services/backend';

function MyComponent() {
  const user = authService.getCurrentUser();
  const giveaways = giveawayService.getAllGiveaways();
  const entries = entryService.getUserEntries(user.id);

  const handleEnter = (giveawayId) => {
    const result = entryService.enterGiveaway(user.id, giveawayId, 1);
    if (result.success) {
      // Refresh entries
      setEntries(entryService.getUserEntries(user.id));
    }
  };

  return (
    // Your component JSX
  );
}
```

---

For more information, check `FEATURES.md` and `QUICK_START.md`.
