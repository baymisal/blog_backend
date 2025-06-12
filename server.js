require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { myDB } = require('./models');

const userRoute = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const blogRoute = require('./routes/blogRoutes');
const roleRoute = require('./routes/roleRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());


app.use('/user', userRoute);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoute);
app.use('/api/role', roleRoute);
app.use('/api/comments', commentRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Sync DB
myDB.sync({ })
  .then(() => console.log(' Database & Tables Synced'))
  .catch(err => console.error('Error syncing database:', err));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});






// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const { myDB } = require('./models'); //  use from models only

// const userRoute = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const blogRoute = require('./routes/blogRoutes');
// const roleRoute = require('./routes/roleRoutes');
// const commentRoutes = require('./routes/commentRoutes');
//  // extra

// const app = express();

// // CORS for frontend at port 3000
// app.use(cors({
//   origin: 'https://blog-frontend-1-3qng.onrender.com',
//   credentials: true
// }));

// // Parse incoming JSON requests
// app.use(express.json());

// app.use('/user', userRoute);
// app.use('/api/auth', authRoutes);
// app.use('/api/blog', blogRoute);
// app.use('/api/role', roleRoute);
// app.use('/api/comments', commentRoutes); // extra

// // Base test route
// app.get('/', (req, res) => {
//   res.send(' API is running...');
// });

// // Sync DB
// myDB.sync({ alter: true })
//   .then(() => console.log('Database & Tables Synced'))
//   .catch(err => console.error(' Error syncing database:', err));

// const PORT = process.env.DB_PORT || 8000;
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });
