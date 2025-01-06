# SkinMatch

SkinMatch merupakan aplikasi web yang membantu pengguna menganalisis tipe kulit mereka dan memberikan rekomendasi produk skincare yang sesuai, dilengkapi dengan notifikasi email hasil analisis.

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
- Automatic email notifications with analysis results (integrated with FinTrackIt Email Service)

## Tech Stack
### Frontend
- React 18
- React Router v7
- Tailwind CSS
- Axios
- Vite
- Nginx (for Docker deployment)
- Deployed on Vercel

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Deployed on Railway

### External Services
- FinTrackIt Email Service (by David Dewanto, 18222027)
  - Email notifications
  - HTML templating
  - Secure token-based authentication

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB
- Docker & Docker Compose (for containerization)
- FinTrackIt API Key

### Environment Variables
#### Frontend (.env)
```
VITE_API_URL=https://skinmatch.up.railway.app
VITE_FINTRACKIT_API_KEY=your_api_key_here
```

#### Backend (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FINTRACKIT_API_KEY=your_api_key_here
```

### Installation & Setup

1. Clone repository
```bash
git clone https://github.com/rafidhiyaulhaq/skinmatch.git
cd skinmatch
```

2. Frontend setup
```bash
cd client
npm install
npm run dev
```

3. Backend setup
```bash
cd server
npm install
npm run dev
```

4. Docker setup
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Project Structure
```bash
skinmatch/
├── client/              # Frontend React application
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Route components
│   │   ├── services/   # API & external services integration
│   │   └── utils/      # Helper functions & templates
│   ├── Dockerfile     # Frontend Docker configuration
│   ├── nginx.conf     # Nginx configuration for Docker
│   └── package.json
│
├── server/              # Backend Node.js application
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── public/        # Static files & documentation
│   ├── Dockerfile     # Backend Docker configuration
│   └── package.json
│
├── docker-compose.yml   # Docker Compose configuration
└── README.md
```

## External Service Integration
SkinMatch terintegrasi dengan FinTrackIt Email Service untuk mengirimkan hasil analisis kulit dan rekomendasi produk kepada pengguna. Service ini menyediakan:
- Pengiriman email otomatis setelah quiz selesai
- Template HTML yang terstruktur
- Secure token-based authentication
- Automatic token refresh

## Deployment
### Production Deployment
- Frontend di-deploy menggunakan Vercel
- Backend di-deploy menggunakan Railway
- Database menggunakan MongoDB Atlas

### Docker Deployment
- Frontend container menggunakan Nginx sebagai web server
- Backend container menggunakan Node.js
- MongoDB container untuk development database
- Container orchestration menggunakan Docker Compose