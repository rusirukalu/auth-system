# MERN Authentication System

A full-stack authentication system built with Next.js, MongoDB, Redux Toolkit, and Tailwind CSS with shadcn/ui components. This project provides a comprehensive authentication flow with secure JWT token handling, protected routes, and a beautiful UI with animations.

## Features

- User registration and login with validation
- JWT authentication with HTTP-only cookies
- Protected routes (both client and server-side)
- Redux Toolkit state management with RTK Query
- Responsive design with Tailwind CSS and shadcn/ui
- Framer Motion animations
- MongoDB integration with Mongoose
- Form validation with React Hook Form and Zod
- User dashboard and profile pages
- Error handling and loading states

## Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Backend**: Next.js API Routes (serverless functions)
- **Database**: MongoDB with Mongoose ODM
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Authentication**: JWT, bcrypt for password hashing
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Configured for Vercel

## Color Palette

- **Primary Dark**: #2b2d42
- **Secondary**: #8d99ae
- **Light Background**: #edf2f4
- **Accent Red**: #ef233c
- **Highlight Red**: #d90429

## Project Structure

auth-system/
├── public/
├── src/
│ ├── app/ # Next.js App Router pages
│ │ ├── api/ # API routes (backend)
│ │ │ └── auth/ # Authentication endpoints
│ │ ├── dashboard/ # Protected dashboard page
│ │ ├── login/ # Login page
│ │ ├── register/ # Registration page
│ │ ├── profile/ # User profile page
│ │ └── about/ # About page
│ ├── components/ # React components
│ │ ├── auth/ # Authentication components
│ │ └── ui/ # UI components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions and models
│ │ ├── models/ # MongoDB models
│ │ ├── utils/ # Utility functions
│ │ └── schemas/ # Validation schemas
│ ├── redux/ # Redux state management
│ │ ├── features/ # Redux slices
│ │ └── services/ # RTK Query services
│ └── middleware.ts # Next.js middleware for route protection
├── .env.local # Environment variables
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── vercel.json # Vercel deployment configuration

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:

git clone https://github.com/yourusername/auth-system.git
cd auth-system

2. Install dependencies:

npm install

# or

yarn install

3. Create a `.env.local` file in the root directory with the following variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000

4. Run the development server:

npm run dev

# or

yarn dev

5. Open http://localhost:3000 in your browser.

## API Routes

- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Login a user
- **POST /api/auth/logout** - Logout a user
- **GET /api/auth/me** - Get current authenticated user
- **GET /api/test** - Test API endpoint

## Authentication Flow

1. **Registration**: User registers with name, email, and password
2. **Login**: User logs in with email and password
3. **JWT Token**: Server generates a JWT token and stores it in an HTTP-only cookie
4. **Protected Routes**: Protected routes check for valid JWT token
5. **Logout**: JWT token is removed from cookies

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add the environment variables in the Vercel dashboard:
   - MONGODB_URI
   - JWT_SECRET
   - NEXTAUTH_SECRET
   - NEXT_PUBLIC_BASE_URL
4. Deploy

## Security Features

- Password hashing with bcrypt
- HTTP-only cookies for JWT storage to prevent XSS attacks
- Server-side route protection with middleware
- Client-side route protection with Redux auth state
- Form validation to prevent malicious inputs
- Error handling to prevent information leakage

## Future Enhancements

- Email verification
- Password reset functionality
- OAuth social logins (Google, GitHub, etc.)
- Multi-factor authentication
- User profile management
- Role-based access control

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
