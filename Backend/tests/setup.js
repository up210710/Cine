const mongoose = require('mongoose');
const connectDB = require('../config/database');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});