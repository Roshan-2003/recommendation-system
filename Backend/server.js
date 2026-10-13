const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'diet_recommendation_jwt_secret_key_2024';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diet_recommendation';

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const FOOD_FILE = path.join(DATA_DIR, 'food_items.json');
const INITIAL_FOODS_FILE = path.join(DATA_DIR, 'initialFoods.json');

function readJson(filePath, defaultValue = []) {
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
    return defaultValue;
  }
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
  }
}

let seedFoods = [];
if (fs.existsSync(INITIAL_FOODS_FILE)) {
  seedFoods = readJson(INITIAL_FOODS_FILE, []);
}
if (!fs.existsSync(FOOD_FILE)) {
  writeJson(FOOD_FILE, seedFoods);
}

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

let isMongoConnected = false;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  age: { type: Number, default: 0 },
  gender: { type: String, default: 'Male' },
  activityLevel: { type: String, default: 'Sedentary' },
  createdAt: { type: Date, default: Date.now }
});

const foodSchema = new mongoose.Schema({
  food_items: { type: String, required: true },
  Calories: { type: Number, required: true },
  category: { type: String, default: 'breakfast' },
  protein: { type: String, default: '' },
  carbs: { type: String, default: '' },
  fat: { type: String, default: '' }
});

const MongoUser = mongoose.model('User', userSchema);
const MongoFood = mongoose.model('FoodItem', foodSchema);

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 2000
}).then(async () => {
  isMongoConnected = true;
  console.log('✅ [Database] Connected successfully to MongoDB:', MONGO_URI);

  try {
    const count = await MongoFood.countDocuments();
    if (count === 0 && seedFoods.length > 0) {
      await MongoFood.insertMany(seedFoods.map(f => {
        const { _id, ...rest } = f;
        return rest;
      }));
      console.log(`✅ [Database] Seeded ${seedFoods.length} initial food items into MongoDB.`);
    }
  } catch (seedErr) {
    console.error('Warning seeding foods into MongoDB:', seedErr.message);
  }
}).catch((err) => {
  isMongoConnected = false;
  console.log('ℹ️  [Database] MongoDB not available (' + err.message + ').');
  console.log('⚡ [Database] Using high-performance local JSON storage in backend/data/. No external setup required!');
});

function calculateNutrition(weight, height, age, gender, activityLevel) {
  const w = parseFloat(weight) || 70;
  const h = parseFloat(height) || 170;
  const a = parseInt(age, 10) || 25;

  let bmr = 0;
  if (gender && gender.toLowerCase() === 'female') {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  }
  bmr = Math.round(bmr);

  const multipliers = {
    'sedentary': 1.2,
    'lightly active': 1.375,
    'moderately active': 1.55,
    'very active': 1.725,
    'super active': 1.9
  };

  const level = (activityLevel || '').toLowerCase().trim();
  const mult = multipliers[level] || 1.375;
  const dailyCalories = Math.round(bmr * mult);

  return { bmr, dailyCalories };
}


// Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Diet Recommendation Backend API is running!',
    dbMode: isMongoConnected ? 'MongoDB' : 'Local JSON Storage',
    port: PORT
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// 1. REGISTER
app.post('/register', async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      weight,
      height,
      age,
      gender,
      activityLevel
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanUsername = (username || normalizedEmail.split('@')[0]).trim();

    if (isMongoConnected) {
      const existing = await MongoUser.findOne({
        $or: [
          { email: normalizedEmail },
          { username: cleanUsername }
        ]
      });
      if (existing) {
        if (existing.email === normalizedEmail) {
          return res.status(400).json({ message: 'User with this email already exists.' });
        }
        return res.status(400).json({ message: 'User with this username already exists. Please choose a different username.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new MongoUser({
        username: cleanUsername,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone ? phone.trim() : '',
        weight: parseFloat(weight) || 0,
        height: parseFloat(height) || 0,
        age: parseInt(age, 10) || 0,
        gender: gender || 'Male',
        activityLevel: activityLevel || 'Sedentary'
      });

      await newUser.save();
      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

      return res.status(201).json({
        message: 'User registered successfully',
        userId: newUser._id.toString(),
        token,
        user: {
          id: newUser._id.toString(),
          username: newUser.username,
          email: newUser.email
        }
      });
    } else {
      // Local file mode
      const users = readJson(USERS_FILE, []);
      const existing = users.find(u =>
        u.email.toLowerCase() === normalizedEmail ||
        (u.username && u.username.toLowerCase() === cleanUsername.toLowerCase())
      );
      if (existing) {
        if (existing.email.toLowerCase() === normalizedEmail) {
          return res.status(400).json({ message: 'User with this email already exists.' });
        }
        return res.status(400).json({ message: 'User with this username already exists. Please choose a different username.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = 'usr_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');
      const newUser = {
        _id: userId,
        username: cleanUsername,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone ? phone.trim() : '',
        weight: parseFloat(weight) || 0,
        height: parseFloat(height) || 0,
        age: parseInt(age, 10) || 0,
        gender: gender || 'Male',
        activityLevel: activityLevel || 'Sedentary',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      writeJson(USERS_FILE, users);

      const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        message: 'User registered successfully',
        userId: newUser._id,
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// 2. LOGIN (supports Email or Username)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email/username and password.' });
    }

    const identifier = email.trim();
    const normalizedIdentifier = identifier.toLowerCase();

    if (isMongoConnected) {
      const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const user = await MongoUser.findOne({
        $or: [
          { email: normalizedIdentifier },
          { username: { $regex: new RegExp(`^${escaped}$`, 'i') } }
        ]
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email/username or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email/username or password.' });
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({
        message: 'Login successful',
        userId: user._id.toString(),
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email
        }
      });
    } else {
      const users = readJson(USERS_FILE, []);
      const user = users.find(u =>
        u.email.toLowerCase() === normalizedIdentifier ||
        (u.username && u.username.toLowerCase() === normalizedIdentifier)
      );
      if (!user) {
        return res.status(401).json({ message: 'Invalid email/username or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email/username or password.' });
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({
        message: 'Login successful',
        userId: user._id,
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// 3. GET USER BY ID
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      let user = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await MongoUser.findById(id).select('-password');
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } else {
      const users = readJson(USERS_FILE, []);
      const user = users.find(u => u._id === id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const { password, ...safeUser } = user;
      return res.json(safeUser);
    }
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// 4. GET ALL FOOD ITEMS (with optional category filter)
app.get('/all-food-item', async (req, res) => {
  try {
    const category = req.query.category;

    if (isMongoConnected) {
      const filter = {};
      if (category && category.toLowerCase() !== 'all') {
        filter.category = new RegExp(`^${category}$`, 'i');
      }
      const items = await MongoFood.find(filter);
      return res.json(items);
    } else {
      let items = readJson(FOOD_FILE, []);
      if (!items || items.length === 0) {
        items = seedFoods;
      }
      if (category && category.toLowerCase() !== 'all') {
        items = items.filter(item => item.category && item.category.toLowerCase() === category.toLowerCase());
      }
      return res.json(items);
    }
  } catch (error) {
    console.error('Get food items error:', error);
    return res.status(500).json({ error: 'Failed to fetch food items' });
  }
});

// 5. CALCULATE BMR, DAILY CALORIES & FOOD ITEMS
app.post('/food-items', async (req, res) => {
  try {
    const { weight, height, age, gender, activityLevel } = req.body;
    const { bmr, dailyCalories } = calculateNutrition(weight, height, age, gender, activityLevel);

    let allItems = [];
    if (isMongoConnected) {
      allItems = await MongoFood.find({});
    } else {
      allItems = readJson(FOOD_FILE, []);
      if (!allItems || allItems.length === 0) {
        allItems = seedFoods;
      }
    }

    return res.json({
      bmr,
      dailyCalories,
      filteredFoodItems: allItems
    });
  } catch (error) {
    console.error('Calculate diet error:', error);
    return res.status(500).json({ error: 'Failed to calculate diet recommendation' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Diet Recommendation Backend Server running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`✨ Status check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================\n`);
});
