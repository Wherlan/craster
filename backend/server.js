require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxury-giveaway';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let db;
MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('luxury-giveaway');
  })
  .catch(error => console.log(error));

// Helper: Verify JWT Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ==================== Authentication ====================

// Initialize DB with default giveaways
app.post('/api/initialize', async (req, res) => {
  try {
    const giveaways = await db.collection('giveaways').findOne();
    if (!giveaways) {
      const defaultGiveaways = [
        { id: '1', name: 'iPhone 15 Pro Max', description: 'Latest Apple flagship smartphone', value: 1299, totalParticipants: 2543, drawDate: '2026-02-15', status: 'active' },
        { id: '2', name: 'MacBook Pro 16"', description: 'M3 Max processor with 48GB RAM', value: 3499, totalParticipants: 1876, drawDate: '2026-02-20', status: 'active' },
        { id: '3', name: 'Apple Watch Ultra', description: 'Premium smartwatch with action button', value: 799, totalParticipants: 5234, drawDate: '2026-02-10', status: 'active' },
        { id: '4', name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise cancellation', value: 399, totalParticipants: 8932, drawDate: '2026-02-12', status: 'active' },
        { id: '5', name: 'DJI Air 3S Drone', description: '4K camera drone with 46-min flight time', value: 1299, totalParticipants: 1243, drawDate: '2026-02-25', status: 'active' },
        { id: '6', name: 'GoPro Hero 12', description: 'Professional action camera', value: 499, totalParticipants: 3421, drawDate: '2026-03-01', status: 'active' },
        { id: '7', name: 'Xbox Series X', description: 'Next-gen gaming console', value: 499, totalParticipants: 4156, drawDate: '2026-03-05', status: 'active' },
        { id: '8', name: 'Nintendo Switch OLED', description: 'Premium gaming handheld console', value: 349, totalParticipants: 5890, drawDate: '2026-03-10', status: 'active' }
      ];
      await db.collection('giveaways').insertMany(defaultGiveaways);
    }
    res.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      email,
      fullName,
      password: hashedPassword,
      createdAt: new Date(),
      kycVerified: false,
      idVerified: false,
      balance: 0,
      totalWinnings: 0,
      entriesCount: 0
    };

    const result = await db.collection('users').insertOne(newUser);
    const userId = result.insertedId.toString();

    // Create JWT token
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      success: true, 
      user: { ...newUser, id: userId }, 
      token 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id.toString(), email }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userWithoutPassword } = user;
    res.json({ 
      success: true, 
      user: { ...userWithoutPassword, id: user._id.toString() }, 
      token 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get current user
app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.userId) });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: { ...userWithoutPassword, id: user._id.toString() } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user profile
app.put('/api/auth/profile', verifyToken, async (req, res) => {
  try {
    const { fullName, kycVerified, idVerified } = req.body;
    const updates = {};
    
    if (fullName) updates.fullName = fullName;
    if (kycVerified !== undefined) updates.kycVerified = kycVerified;
    if (idVerified !== undefined) updates.idVerified = idVerified;

    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(req.userId) },
      { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = result.value;
    res.json({ success: true, user: { ...userWithoutPassword, id: result.value._id.toString() } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Giveaways ====================

// Get all giveaways
app.get('/api/giveaways', async (req, res) => {
  try {
    const giveaways = await db.collection('giveaways').find().toArray();
    res.json({ success: true, giveaways });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Entries ====================

// Enter giveaway
app.post('/api/entries', verifyToken, async (req, res) => {
  try {
    const { giveawayId } = req.body;

    // Check if already entered
    const existingEntry = await db.collection('entries').findOne({ 
      userId: req.userId, 
      giveawayId 
    });

    if (existingEntry) {
      return res.status(400).json({ success: false, message: 'Already entered this giveaway' });
    }

    // Create entry
    const entry = {
      userId: req.userId,
      giveawayId,
      entryCount: 1,
      createdAt: new Date()
    };

    await db.collection('entries').insertOne(entry);

    // Update user entries count
    await db.collection('users').updateOne(
      { _id: new ObjectId(req.userId) },
      { $inc: { entriesCount: 1 } }
    );

    res.json({ success: true, message: 'Successfully entered giveaway' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user entries
app.get('/api/entries', verifyToken, async (req, res) => {
  try {
    const entries = await db.collection('entries')
      .find({ userId: req.userId })
      .toArray();

    res.json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== Error Handling ====================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Server error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
