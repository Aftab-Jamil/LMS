# Learning Management System (LMS)

A modern Learning Management System built with React, Express, and MongoDB. This platform provides a comprehensive solution for online education, featuring course management, student enrollment, and interactive learning experiences.

## Features

- **User Authentication**
  - Role-based access (Admin, Instructor, Student)
  - Secure login and registration
  - Session management

- **Course Management**
  - Create and manage courses
  - Upload course materials
  - Track student progress
  - Course analytics

- **Student Features**
  - Course enrollment
  - Progress tracking
  - Interactive learning materials
  - Assignment submission

- **Instructor Dashboard**
  - Course creation and management
  - Student progress monitoring
  - Content management
  - Analytics and reporting

- **Admin Panel**
  - User management
  - System configuration
  - Course approval
  - Analytics dashboard

## Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Radix UI Components
- React Quill (Rich Text Editor)
- React Player (Video Player)
- Recharts (Data Visualization)

### Backend
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary (Media Storage)
- Razorpay (Payment Integration)
- Multer (File Upload)

## Project Structure

```
LMS/
├── client/                 # Frontend application
│   ├── src/               # Source files
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
└── server/                # Backend application
    ├── controllers/       # Route controllers
    ├── middlewares/       # Custom middleware
    ├── routers/           # API routes
    ├── Entities/          # Database models
    ├── utils/             # Utility functions
    ├── uploads/           # File uploads
    └── package.json       # Backend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd LMS
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Configure environment variables:
   - Create `.env` files in both server and client directories
   - Add necessary environment variables (see .env.example)

5. Start the development servers:

   Backend:
   ```bash
   cd server
   npm run dev
   ```

   Frontend:
   ```bash
   cd client
   npm run dev
   ```

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Client (.env)
```
VITE_API_URL=http://localhost:5173
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Aftab Jamil - aftabjamil2022@gift.edu.in