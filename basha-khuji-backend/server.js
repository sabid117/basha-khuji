const express = require('express');
const connectDB = require('./config/db');
const listingRoutes = require('./routes/listingRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(require('cors')());
app.use('/api', listingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
