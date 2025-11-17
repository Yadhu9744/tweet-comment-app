# Tweet Comment Classifier

A simple web app to fetch comments from a Tweet, classify them as Green or Red based on length, and hide all Red flagged comments.

## Features

- Fetch comments for a specific Tweet ID
- Classify comments:
  - Green Flags ✅ → length ≤ 10
  - Red Flags 🚩 → length > 10
- Hide all Red Flags with a single click
- Responsive and user-friendly UI

## Tech Stack

- Frontend: React.js, CSS
  
- Backend: Flask (Python)
  
- Communication: REST API (GET & POST)

  
- CORS enabled for local development

## Setup Instructions


### Backend (Flask)

1. Navigate to backend folder:
   
   cd backend
   
Install dependencies:


pip install flask flask-cors

Run the server:



python app.py

Server runs at http://127.0.0.1:5000

Frontend (React)

Navigate to frontend folder:


cd frontend

Install dependencies:


npm install
Run the app:


npm start

App runs at http://localhost:3000

Demo

Enter Tweet ID (example: 1001)  →   Fetch Comments →     See Green & Red flags

Click Hide All Red Flags   →    Red comments disappear, success message appears

