# Next.js Authentication System

A comprehensive full-stack authentication system built with Next.js 15, MongoDB, and Redux. Features secure user authentication, elegant UI with dark theme and glassmorphism effects, and seamless deployment on Vercel.

Authentication System Screenshot

## 🌟 Live Demo

Experience the application live: [Next.js Auth System](https://auth-system-neon-sigma.vercel.app/)

## ✨ Features

- **Complete Authentication Flow**: Register, login, logout, and protected routes
- **Secure by Design**: HTTP-only cookies, JWT tokens, and bcrypt password hashing
- **Elegant Dark-themed UI**: Beautiful glassmorphism effects with Tailwind CSS v4
- **Responsive Design**: Optimized for all device sizes
- **Form Validation**: Client and server-side validation for all forms
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **Serverless Architecture**: Optimized for Vercel deployment
- **MongoDB Integration**: Seamless connection to MongoDB Atlas

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**: Latest React framework with App Router
- **TailwindCSS v4**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **shadcn/ui**: Beautifully designed UI components
- **Sonner**: Toast notifications

### Backend

- **Next.js API Routes**: Serverless backend architecture
- **MongoDB**: NoSQL database with Mongoose ODM
- **Bcrypt**: Secure password hashing

### State Management \& Authentication

- **Redux Toolkit**: Centralized state management
- **RTK Query**: Efficient API data fetching and caching
- **JWT**: JSON Web Tokens for authentication
- **HTTP-only Cookies**: Secure token storage

## 🎨 Design Elements

The application features a carefully selected color palette:

- **Primary Dark**: \#2b2d42 - Used for backgrounds and primary elements
- **Secondary**: \#8d99ae - Used for secondary text and UI details
- **Light Background**: \#edf2f4 - Used for light elements and contrast
- **Accent Red**: \#ef233c - Used for buttons and important actions
- **Highlight Red**: \#d90429 - Used for hover states and emphasis

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/auth-system.git
cd auth-system
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Project Structure

```
auth-system/
├── public/            # Static assets
├── src/
│   ├── app/
│   │   ├── api/       # API routes (backend)
│   │   │   └── auth/  # Authentication endpoints
│   │   ├── dashboard/ # Protected dashboard page
│   │   ├── login/     # Login page
│   │   ├── profile/   # User profile page
│   │   ├── register/  # Registration page
│   │   └── ...
│   ├── components/
│   │   ├── auth/      # Authentication components
│   │   └── ui/        # UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and middleware
│   │   ├── middleware/ # Authentication middleware
│   │   ├── models/    # MongoDB models
│   │   └── utils/     # Helper utilities
│   └── redux/         # Redux state management
│       ├── features/  # Redux slices
│       └── services/  # RTK Query services
├── .env.local         # Environment variables (not in repo)
├── .eslintrc.json     # ESLint configuration
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── ...                # Other configuration files
```

## 🔒 Authentication Flow

1. **Registration**: User submits registration form → Password is hashed → User is stored in MongoDB → JWT token is generated → Token is stored in HTTP-only cookie → User is redirected to dashboard
2. **Login**: User submits login form → Password is verified against hashed password → JWT token is generated → Token is stored in HTTP-only cookie → User is redirected to dashboard
3. **Auth Check**: On page load, middleware checks for valid JWT token in cookies → If valid, user is allowed to access protected routes → If invalid or missing, user is redirected to login
4. **Logout**: User clicks logout → JWT token is invalidated → Cookie is removed → User is redirected to login page

## 🔐 API Endpoints

- **POST /api/auth/register**: Create a new user account
- **POST /api/auth/login**: Authenticate a user and create a session
- **POST /api/auth/logout**: End the user's session
- **GET /api/auth/me**: Get the current authenticated user's data

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (320px to 767px)

## 🚢 Deployment

This application is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy

## ⚠️ Common Issues and Solutions

**Issue**: Authentication cookie not being set correctly in production
**Solution**: Ensure your JWT token cookie is configured with proper settings for production:

```typescript
cookieStore.set('auth_token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
});
```

**Issue**: Infinite redirect loop after logout
**Solution**: Use window.location.href instead of router.push for logout to ensure a complete page reload:

```typescript
window.location.href = '/login';
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service
- [Vercel](https://vercel.com/) - Deployment platform
