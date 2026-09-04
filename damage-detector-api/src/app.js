const express = require('express');
const cors = require('cors');

const damageRoutes = require('./routes/damage.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', damageRoutes);

app.get('/', (req, res) => res.json({ message: 'API is running' }));

module.exports = app;
