# ⛳ Golf Platform - Admin & Analytics Dashboard

A full-stack web application designed for golf tournament organizers to manage users, track scores, and analyze platform engagement in real-time. Built with a focus on **scalability**, **stateless architecture**, and **secure authentication**.

---

## 🚀 Features
- **User Management:** Secure Sign-up/Login flow using **Bcryptjs** for password hashing and **JWT** for session management.
- **Real-time Database:** Integrated with **Supabase** (PostgreSQL) for high-performance data retrieval.
- **Admin Dashboard:** A Next.js-powered interface to visualize user growth and platform activity.
- **RESTful API:** A clean, decoupled Node.js/Express backend following REST principles.
- **Analytics:** Track matches, scores, and subscription statuses across the platform.

---

## 🛠️ Tech Stack
- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database & Auth:** Supabase (PostgreSQL)
- **Security:** JSON Web Tokens (JWT), Bcryptjs
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)

---
Markdown## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/Golf_Platform.git
cd Golf_Platform
2. Backend SetupNavigate to the backend folder and install dependencies:Bashcd backend
npm install
Create a .env file in the /backend directory:PlaintextPORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
JWT_SECRET=your_super_secret_key
3. Frontend SetupNavigate to the frontend folder and install dependencies:Bashcd ../frontend
npm install
4. Running the ProjectStart Backend:Bashcd backend
node server.js
Start Frontend:Bashcd frontend
npm run dev
🔌 API Endpoints (RESTful)MethodEndpointDescriptionPOST/auth/registerRegister a new user with hashed passwordsPOST/auth/loginAuthenticate user and receive a JWTGET/api/scoresFetch all golf scores (Protected Route)POST/api/matchesCreate a new match entry📂 Project StructurePlaintextGolf_Platform/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── frontend/
    ├── app/
    ├── components/
    └── styles/
🧠 Key LearningsFull-Stack Architecture: Built a decoupled system from scratch using Node.js and Next.js.Security: Implemented robust Authentication & Authorization using JWT and Bcrypt.Database Design: Architected a relational schema in PostgreSQL (Supabase) to handle complex golf data.Business Logic: Developed workflows for score tracking, draws, and a rewards system.🚀 Future ImprovementsPayments: Stripe integration for tournament entry fees.Communication: Automatic email notifications for match updates.Engagement: Real-time leaderboard using Supabase webhooks.UI/UX: Enhancing mobile responsiveness for on-course use.📌 AuthorMitul Bhale IIT Roorkee💡 InspirationA platform designed to bridge the gap between gaming, rewards, and social impact through meaningful charity contributions.
---

## 💡 Inspiration

A platform combining gaming, rewards, and social impact through charity contributions
