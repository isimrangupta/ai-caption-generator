const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRouters = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["https://ai-caption-generator-omega.vercel.app"],  
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE"],           
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRouters);



module.exports = app;