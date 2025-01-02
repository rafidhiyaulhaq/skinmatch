# SkinMatch

SkinMatch adalah aplikasi web yang membantu pengguna menganalisis tipe kulit mereka dan memberikan rekomendasi produk skincare yang sesuai.

## Live URLs
- Frontend: https://skinmatch-five.vercel.app
- Backend: https://skinmatch.up.railway.app

## Documentation
- Frontend documentation: https://skinmatch-five.vercel.app/docs  
- Backend API documentation: https://skinmatch.up.railway.app/docs

## Features
- User authentication (register/login)
- Skin type analysis quiz
- Personalized product recommendations
- User profile management
- Quiz history tracking

## Tech Stack
### Frontend
- React 18
- React Router v7
- Tailwind CSS
- Axios
- Vite
- Deployed on Vercel

### Backend  
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Deployed on Railway

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB

### Installation & Setup

1. Clone repository
```bash
git clone https://github.com/rafidhiyaulhaq/skinmatch.git
cd skinmatch

### Project Structure

skinmatch/
├── client/           # Frontend React application
│   ├── public/       # Static files
│   └── src/
│       ├── components/  
│       ├── pages/
│       ├── services/
│       └── utils/
│
└── server/           # Backend Node.js application
    ├── config/       # Configuration files
    ├── controllers/  # Route controllers
    ├── models/       # Database models
    ├── routes/       # API routes
    └── public/       # Static files & documentation

