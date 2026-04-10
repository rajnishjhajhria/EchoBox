require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const { seedPosts } = require('./seed');
const { ensureAdminUser } = require('./seedAdmin');
const Notification = require('./models/Notification');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');
    await ensureAdminUser();
    await seedPosts();
  })
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/api/admin/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
