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

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/Golf_Platform.git](https://github.com/your-username/Golf_Platform.git)
cd Golf_Platform

2. Backend Setup
Navigate to the backend folder and install dependencies:

cd Backend
npm install

Create a .env file in the /Backend directory:
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
JWT_SECRET=your_super_secret_key

3. Frontend Setup
Navigate to the frontend folder and install dependencies:

cd ../Frontend
npm install

4. Running the Project
Start Backend:

cd Backend
node server.js

Start Frontend:
cd Frontend
npm run dev

Method,Endpoint,Description
POST,/auth/register,Register a new user with hashed passwords
POST,/auth/login,Authenticate user and receive a JWT
GET,/api/scores,Fetch all golf scores (Protected Route)
POST,/api/matches,Create a new match entry

## 📂 Project Structure
Golf_Platform/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── app/
│ ├── components/
│ └── styles/


## 🧠 Key Learnings

- Built full-stack architecture from scratch
- Implemented authentication & authorization
- Designed relational database schema
- Created admin workflows & analytics
- Integrated business logic (draw + rewards system)

---

## 🚀 Future Improvements

- Stripe payment integration
- Email notifications
- Real-time leaderboard
- Mobile responsiveness improvements

---

## 📌 Author

Mitul Bhale  
IIT Roorkee  

---

## 💡 Inspiration

A platform combining gaming, rewards, and social impact through charity contributions
