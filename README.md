# JaMoveo Frontend

This is the **React frontend** for the JaMoveo app, a collaborative live music platform that allows users to join live sessions, view lyrics and chords, and interact in real time. The app is powered by a Node.js backend and MongoDB database.

---

## 🚀 Features

- 🔐 User login and session-based authentication
- 🎵 Real-time live song display via Socket.IO
- 📜 Song lyrics and chords view with fallback logic
- 📡 Backend API integration via Axios
- 🛠️ Environment-based configuration (dev vs production)

---

## 🧑‍💻 Tech Stack

- **React**
- **Vite**
- **Socket.IO Client**
- **Axios**

---

## 🛠️ Project Setup

<!-- 1. Install dependencies -->
npm install

<!-- 2. Development server -->
npm run dev:remote (or dev:remote:mac)

## 🧩 Folder Structure

frontend/
├── src/
    ├── data/             # Static data
│   ├── assets/           # Images, icons, etc.
│   ├── cmps/             # Reusable components
│   ├── pages/            # Route-level views
│   ├── services/         
│   ├── RootCmp.jsx
│   └── index.jsx
├── index.html
├── package.json
└── vite.config.js







