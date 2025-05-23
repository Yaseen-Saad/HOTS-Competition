# HOTS: Siege of Shadows

A modern, accessible, and responsive website for the HOTS: Siege of Shadows academic competition targeting Egyptian high school students.

## 🚀 Features

- **Modern UI Design** - Striking futuristic scientific design with blue gradients, glassmorphism, and animations
- **Responsive Layout** - Fully responsive design that works on all devices
- **Accessibility** - ARIA attributes, keyboard navigation, and proper semantic HTML
- **Interactive Elements** - Form validation, animations, and interactive components
- **Multiple Pages** - Home, About, Registration, Past Competitions, and Success pages

## 📋 Pages

- **Home** - Landing page with hero section, competition overview, features, and timeline
- **About** - Information about the competition, organizers, and sponsors
- **Registration** - Interactive form for team registration with validation
- **Past Competitions** - Archive of previous competitions with tabs for different years
- **Success** - Confirmation page for successful registration

## 🛠️ Technologies

- **Express.js** - Server-side framework
- **EJS** - Templating engine for dynamic content
- **JavaScript** - Client-side interactions and animations
- **CSS** - Custom styling with modern techniques

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/hots-siege-of-shadows.git
cd hots-siege-of-shadows
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Production Deployment

To run in production mode:

```bash
npm start
```

## 📁 Project Structure

```
hots-siege-of-shadows/
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── pages.css
│   ├── js/
│   │   ├── main.js
│   │   └── form-validation.js
│   └── images/
│       ├── LOGO.png
│       └── image.gif
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── about.ejs
│   ├── register.ejs
│   ├── past-competitions.ejs
│   ├── success.ejs
│   └── error.ejs
├── app.js
├── package.json
└── README.md
```

## 🔧 Customization

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
```

### Adding New Pages

1. Create a new EJS template in the views directory
2. Add the route in app.js
3. Update the navigation links in header.ejs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For any questions or support, please contact: contact@hots.example.com 