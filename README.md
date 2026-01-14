# SmartDesk

SmartDesk is an AI-assisted student feedback intelligence platform designed to help universities
collect, cluster, and prioritize student issues using semantic understanding.

Created by rynixofficial

## Features
- Student feedback submission
- AI-assisted topic similarity & clustering
- Automatic category classification
- Vote-based prioritization
- Admin analytics dashboard
- Role-based authentication (Student / Admin)
- Fully offline AI using **Gemma via Ollama**

## Tech Stack
- Backend: Node.js, Express.js
- Frontend: EJS, Tailwind CSS, Bootstrap
- Database: MongoDB (Mongoose)
- Auth: JWT (HTTP-only cookies)
- AI: Gemma (local) via Ollama

## Demo Credentials
**Student**
- Username: 25SUUBEADS185
- Password: student123

**Admin**
- Username: admin
- Password: admin123

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB
- Ollama (for AI features)

### Clone the repository
```bash
git clone https://github.com/rynixofficial/smartdesk.git
cd smartdesk
```

### Install dependencies
```bash
npm install
cd client && npm install && cd ..
```

### Environment Variables
Create a `.env` file in the root directory:
```
MONGO_URI=mongodb://localhost:27017/smartdesk
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Seed Database
```bash
npm run seed
```

### Start Development Server
```bash
npm run dev
```

### Production Deployment
```bash
# Build for production
cd client && npm run build && cd ..

# Start production server
npm start
```

### Docker Deployment
```bash
docker build -t smartdesk .
docker run -p 3000:3000 smartdesk
```

Created by rynixofficial
