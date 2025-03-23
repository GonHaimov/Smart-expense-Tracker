# 💰 Smart Expense Tracker with AI

An intelligent and user-friendly web application that helps you track and manage your expenses. Built with modern technologies and enhanced with AI-based expense categorization.

---

## 🧠 Description

Smart Expense Tracker is a full-stack web app that allows users to:

- Add, view, and manage expenses
- Automatically categorize expenses using AI (e.g., Food, Gas, Entertainment, etc.)
- Visualize spending habits with interactive graphs
- Receive insights and tips to save money

---

## 🚀 Live Demo

_Coming soon..._

---

## 🔧 Tech Stack

### 💻 Frontend
- React.js
- CSS Modules

### ⚙️ Backend
- FastAPI (Python)

### 🗃️ Database
- MongoDB

### 🤖 AI Features
- NLP-based text analysis for expense categorization

---

## 📦 Features

- ✅ User authentication (JWT-based)
- ✅ Add expenses with amount, category, and date
- ✅ Secure backend with FastAPI
- ✅ MongoDB integration for storing user and expense data
- ✅ Responsive UI
- ✅ Data visualization (planned)
- ✅ AI-powered category detection (planned)

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js
- Python 3.9+
- MongoDB running locally
- `pip` and `npm` installed

### 1. Clone the Repo

git clone https://github.com/GonHaimov/smart-expense-tracker.git
cd smart-expense-tracker 


### 2. Backend Setup

cd backend  
pip install -r requirements.txt  
uvicorn main:app --reload

The backend will start on http://127.0.0.1:8000  
Make sure MongoDB is running locally (default: mongodb://localhost:27017)

### 3. Frontend Setup
cd frontend  
npm install  
npm start

The frontend will start on http://localhost:3000 (or another port if 3000 is in use)  
Make sure the backend is running before using the app

