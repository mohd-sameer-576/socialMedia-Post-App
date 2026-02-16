const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookies = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://artistnetwork.netlify.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use('/api/auth', authRoutes);

app.use('/api/posts', postRoutes);



module.exports = app;