# Demo 3-Tier Application

This repository contains a fully functional 3-tier application consisting of a **React frontend**, a **FastAPI backend**, and a **PostgreSQL database**. The app allows you to create, read, update, and delete items, demonstrating a robust CRUD workflow.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Database Setup](#2-database-setup)
  - [3. Backend Setup](#3-backend-setup)
  - [4. Frontend Setup](#4-frontend-setup)
  - [5. Running the App](#5-running-the-app)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [CI/CD](#cicd)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

- **React** frontend (with Axios for API calls)
- **FastAPI** backend (Python)
- **PostgreSQL** database for persistent storage
- Full CRUD (Create, Read, Update, Delete) functionality
- Clean, modern UI
- Environment-based configuration
- Automated tests and CI/CD

---

## Architecture

```
[ React Frontend ]  <---- REST ---->  [ FastAPI Backend ]  <---- SQL ---->  [ PostgreSQL DB ]
       :3000                          :8000                                :5432 (default)
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Python](https://www.python.org/) (3.10 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (any recent version)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (optional, for development)

---

## Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/three-tier-application.git
cd three-tier-application
```

### 2. Database Setup

#### a. Start PostgreSQL

Make sure PostgreSQL server is running.

#### b. Create the Database

Open **SQL Shell (psql)** or **pgAdmin** and run:

```sql
CREATE DATABASE demo_app;
```

**Note:** Default credentials are `postgres`/`password`. Update as needed in the `.env` file.

---

### 3. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # On Windows
# Or: source venv/bin/activate   # On Mac/Linux
pip install --upgrade pip
pip install -r requirements.txt
```

#### a. Create `.env` file in `backend/`

```
DATABASE_URL=postgresql://postgres:password@localhost/demo_app
```

Update credentials if your PostgreSQL setup is different.

#### b. Run the Backend Server

```bash
uvicorn main:app --reload
```

The backend will run at [http://localhost:8000](http://localhost:8000)

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

#### a. Create `.env` file in `frontend/`

```
REACT_APP_API_URL=http://localhost:8000
```

#### b. Run the Frontend Server

```bash
npm start
```

The frontend will run at [http://localhost:3000](http://localhost:3000)

---

## 5. Running the App

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Use the UI to create, edit, and delete items.
- Data will be persisted in your PostgreSQL database.

---

## Running Tests

### Backend Tests

```bash
cd backend
venv\Scripts\activate    # (if not already activated)
pytest
```

---

## Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL=postgresql://postgres:password@localhost/demo_app
```

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:8000
```

---

## CI/CD

- **Backend**: GitHub Actions workflow runs tests and deploys to Render on push to `main`.
- **Frontend**: GitHub Actions workflow builds and deploys to Vercel on push to `main`.
- See `.github/workflows/` for details.

---

## Troubleshooting

- **Database connection error**: Ensure PostgreSQL is running and credentials in `.env` are correct.
- **Port conflicts**: Make sure nothing else is running on ports 3000 or 8000.
- **Windows-specific**: Always activate your Python virtual environment with `venv\Scripts\activate`.
- **Frontend API errors**: Confirm `REACT_APP_API_URL` matches your backend URL.

---

## License

MIT

---

> **Happy coding!**