# Sahaara 🤝
> 🌱 *Because sometimes, all we need is someone to talk to.*


A peer-to-peer mental health support platform that connects individuals seeking and offering emotional support. Built with the MERN stack, Sahaara enables users to connect with supportive peers, engage in real-time chat, and conduct video calls for meaningful conversations.

<img width="1469" height="800" alt="image" src="https://github.com/user-attachments/assets/58dcb19b-49bd-432e-98cc-9fc4bac7cd8a" />

## 🌐 [Deployed Website](https://sahaara-m6qg.onrender.com/)



## 📸 Screenshots

<!-- Add authentication screens -->
<!-- ![Login Page](./screenshots/login.png) -->
Login Page
<img width="1469" height="801" alt="image" src="https://github.com/user-attachments/assets/47afc201-e431-4dda-8932-fc54fe9a53ec" />

<!-- ![Signup Page](./screenshots/signup.png) -->
Signup Page
<img width="1470" height="798" alt="image" src="https://github.com/user-attachments/assets/91573d86-7ab5-441b-8ed2-3d993fbabbf5" />

<!-- Add onboarding screen -->
<!-- ![Onboarding](./screenshots/onboarding.png) -->
Onboarding
<img width="1470" height="801" alt="image" src="https://github.com/user-attachments/assets/1c9f22e4-3cf5-429f-974c-c7485033ee99" />

<!-- Add main features screenshots -->
Home Feed
<img width="1467" height="798" alt="image" src="https://github.com/user-attachments/assets/e6416d65-4cac-4d00-9cf9-47b2f93e1d19" />

<!-- ![Friends Page](./screenshots/friends.png) -->
Friends Page
<img width="1459" height="798" alt="image" src="https://github.com/user-attachments/assets/c690c60b-4ff4-44b5-bf68-084928ee59e7" />

<!-- ![Chat Interface](./screenshots/chat.png) -->
Chat Interface
<img width="2939" height="1584" alt="image" src="https://github.com/user-attachments/assets/3d725cef-ac93-4bcf-b291-88471d08e913" />

<!-- ![Video Call](./screenshots/video-call.png) -->
Video Call
<img width="1470" height="747" alt="image" src="https://github.com/user-attachments/assets/e4dac90c-9155-429a-8675-ce8d6d426796" />

<!-- ![Notifications](./screenshots/notifications.png) -->
Notifications
<img width="1470" height="799" alt="image" src="https://github.com/user-attachments/assets/eee35910-b6f2-42ea-bfe4-bd8670ec6a9f" />


## ✨ Features

- **User Authentication**: Secure signup/login with JWT-based authentication
- **Profile Onboarding**: Complete profile setup with support preferences
- **Friend System**: Send, receive, and accept friend requests
- **Real-time Chat**: Powered by Stream Chat for seamless messaging
- **Video Calls**: Integrated video calling using Stream Video SDK
- **Friend Discovery**: Find peers based on support topics
- **Theme Customization**: 30+ themes to personalize your experience
- **Responsive Design**: Works seamlessly across devices

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Navigation
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **Stream Chat React** - Chat interface
- **Stream Video React SDK** - Video calling
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stream Chat** - Chat backend
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stream Account (for chat and video features)
  - Get your API key from [Stream.io](https://getstream.io/)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd sahaara
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_STREAM_API_KEY=your_stream_api_key
```

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5001`

**Frontend:**
```bash
cd frontend
npm run dev
```
Client runs on `http://localhost:5173`

### Production Build

```bash
# From root directory
npm run build
npm start
```

## 📁 Project Structure

```
sahaara/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Custom middleware
│   │   ├── lib/              # Utilities (DB, Stream)
│   │   └── server.js         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # API and utilities
│   │   ├── store/            # Zustand stores
│   │   ├── constants/        # App constants
│   │   └── main.jsx          # Entry point
│   └── package.json
└── package.json
```

## 🔑 Key Features Explained

### Authentication Flow
1. Users sign up with email and password
2. JWT token stored in HTTP-only cookie
3. Protected routes verify token on each request
4. Onboarding required before accessing main features

### Friend System
- Discover users based on support topics
- Send friend requests to peers
- Accept/decline incoming requests
- View your friends list

### Chat & Video
- Real-time messaging with Stream Chat
- One-on-one video calls via Stream Video
- Video call links sent through chat
- Persistent chat history

### Support Topics
Users can specify:
- **Can Support**: Topics they can help others with
- **Need Support**: Areas where they seek support

Available topics include:
- Stress & Anxiety
- Academic Pressure
- Career/Job Stress
- Loneliness & Isolation
- Depression Support
- And more...

## 🎨 Themes

Sahaara includes 30+ beautiful themes powered by DaisyUI:
- Light/Dark modes
- Cupcake, Forest, Synthwave
- Dracula, Nord, Cyberpunk
- And many more!

## 🔒 Security Features

- Password hashing with bcryptjs
- HTTP-only cookies for JWT
- CORS protection
- Input validation
- Protected API routes

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/onboarding` - Complete profile
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `POST /api/users/friend-request/:id` - Send friend request
- `PUT /api/users/friend-request/:id/accept` - Accept request
- `GET /api/users/friend-requests` - Get friend requests
- `GET /api/users/outgoing-friend-requests` - Get outgoing requests

### Chat
- `GET /api/chat/token` - Get Stream chat token

## 💡 What I Learned

### Technical Skills

**Frontend Development:**
- Building dynamic UIs with React components, hooks (`useState`, `useEffect`), and conditional rendering
- Implementing client-side routing with React Router for dynamic pages like `/chat/:id`
- Creating reusable utility functions and mapping constants for icon rendering
- Working with data arrays to render lists of support topics dynamically
- Responsive design with Tailwind CSS for cards, badges, and layouts
- Managing asynchronous operations and displaying loading/error states

**Backend Development:**
- Building RESTful APIs with Express.js (GET/POST/PUT endpoints)
- Implementing authentication middleware with JWT for route protection
- Database operations with MongoDB and Mongoose for users, friend requests, and chat data
- Structuring backend code with controllers, models, routes, and middleware

**Full-Stack Integration:**
- Connecting React frontend with Express backend via Axios
- Handling API responses and error states (404s, validation errors)
- Managing environment variables for development and production
- Integrating third-party services (Stream Chat & Video SDK)

**Development Practices:**
- Version control with Git for tracking changes
- Debugging API routing issues and frontend-backend communication
- Project architecture planning (folder structure, data flow)

### Soft Skills & Design Thinking

- **Problem-Solving:** Debugged routing mismatches, API errors, and integration issues
- **Adaptability:** Transformed a language exchange tutorial into a mental health peer-support platform
- **User-Centric Design:** Focused on creating intuitive UI with meaningful badges, icons, and clear navigation
- **Feature Prioritization:** Delivered core functionality (chat, video, friend system) within a 3-day timeline
- **Forward Thinking:** Planned future improvements like multi-select for support topics
- **Full-Stack Mindset:** Gained confidence working across frontend, backend, database, and deployment
