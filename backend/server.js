const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
require('dotenv').config({ path: './backend/.env' });
require("dotenv").config();
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');
const driveRoutes = require('./routes/driveRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static frontend files (We will place frontend in the 'frontend' directory)
app.use(express.static('frontend'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notices', noticeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
