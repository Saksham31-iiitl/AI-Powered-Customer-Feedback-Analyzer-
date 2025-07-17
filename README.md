# 🧠 AI-Powered Customer Feedback Analyzer

This project is a full-stack application that analyzes customer feedback using sentiment analysis. Built using **FastAPI** (backend) and **React.js** (frontend), it helps businesses get quick insights from customer reviews.

---

## 🔧 Tech Stack

- **Frontend**: React.js
- **Backend**: FastAPI + SQLAlchemy
- **Database**: SQLite
- **Sentiment Analysis**: TextBlob

---

## 🚀 Features

- Submit customer feedback via UI
- Analyze sentiment (Positive/Negative/Neutral)
- Store and retrieve data from a database
- API integration between backend and frontend

---

## 🛠️ Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # for Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

## FrontEnd
 ```bash
cd frontend
npm install
npm start
```

## 🌐 Usage
Start backend server (FastAPI)

Start frontend (React)

Go to http://localhost:3000 to use the app


## 📂 Folder Structure

``` bash
AI-Powered Customer Feedback Analyzer/
├── backend/
│   ├── main.py
│   └── ...
├── frontend/
│   ├── src/
│   └── ...
├── .gitignore
└── README.md

```



