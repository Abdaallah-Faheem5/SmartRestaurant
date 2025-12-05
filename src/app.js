require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');


// Routes
const authRoutes = require('./routes/auth.routes');
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.routes');
const tableRoutes = require('./routes/table.routes');
const inventoryRoutes = require('./routes/inventory.routes');
const reservationRoutes = require('./routes/reservation.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const reviewRoutes = require('./routes/review.routes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();

// Security & Parsing Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/tables', tableRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: 'مرحباً بك في Smart Restaurant API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      menu: '/api/v1/menu',
      orders: '/api/v1/orders',
      tables: '/api/v1/tables',
      inventory: '/api/v1/inventory',
      reservations: '/api/v1/reservations',
      analytics: '/api/v1/analytics',
      reviews: '/api/v1/reviews'
    }
  });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
});

module.exports = app;