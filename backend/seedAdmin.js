require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/echobox';

async function ensureAdminUser() {
  const existingAdmin = await User.findOne({ username: 'admin' });

  if (existingAdmin) {
    console.log('Admin exists.');
    return { created: false };
  }

  await User.create({ username: 'admin', password: 'password', isAdmin: true });
  console.log('Admin created.');
  return { created: true };
}

if (require.main === module) {
  mongoose.connect(MONGO_URI)
    .then(async () => {
      await ensureAdminUser();
      await mongoose.disconnect();
      process.exit();
    })
    .catch(async err => {
      console.error('Error:', err);
      try {
        await mongoose.disconnect();
      } catch (disconnectError) {
        console.error('Disconnect Error:', disconnectError);
      }
      process.exit(1);
    });
}

module.exports = { ensureAdminUser };
