const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to pass currentPath to all templates
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.currentYear = new Date().getFullYear();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'HOTS: Siege of Shadows | Higher Order Thinking Skills',
    path: '/'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About HOTS | Siege of Shadows',
    path: '/about'
  });
});

// Instructions page for registration
app.get('/instructions', (req, res) => {
  res.render('instructions', { 
    title: 'Registration Instructions | HOTS: Siege of Shadows',
    path: '/instructions'
  });
});

// Registration form page
app.get('/register', (req, res) => {
  res.render('register', { 
    title: 'Register Your Team | HOTS: Siege of Shadows',
    path: '/register'
  });
});

app.get('/past-competitions', (req, res) => {
  res.render('past-competitions', { 
    title: 'Past Competitions | HOTS: Siege of Shadows',
    path: '/past-competitions' 
  });
});

app.get('/success', (req, res) => {
  res.render('success', { 
    title: 'Registration Successful | HOTS: Siege of Shadows',
    path: '/success'
  });
});

app.post('/register', (req, res) => {
  // Process form data here (future implementation)
  console.log('Form submission:', req.body);
  // For now, just redirect to success page
  res.redirect('/success');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { 
    title: 'Page Not Found | HOTS: Siege of Shadows',
    path: req.path,
    errorCode: 404,
    errorMessage: 'The page you are looking for does not exist'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Server Error | HOTS: Siege of Shadows',
    path: req.path,
    errorCode: 500,
    errorMessage: 'Something went wrong on our end'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 