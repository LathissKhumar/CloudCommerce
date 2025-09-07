require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function run() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cloudcommerce';
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const email = process.env.ADMIN_EMAIL || 'admin@cloudcommerce.local';
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  let user = await User.findOne({ email });
  if (user) {
    user.role = 'admin';
    await user.save();
    console.log('Existing user promoted to admin:', email);
  } else {
    user = new User({ username, email, password, role: 'admin' });
    await user.save();
    console.log('Admin user created:', email);
  }
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});



