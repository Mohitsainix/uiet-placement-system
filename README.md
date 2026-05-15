# UIET Kurukshetra Placement Management System

A modern, production-ready full-stack web application designed to digitize the placement process for University Institute of Engineering and Technology, Kurukshetra University.

## Features

- **Multi-role Authentication:** Separate dashboards for Students, Companies, and TPO (Admins).
- **Modern UI/UX:** Built with a custom Vanilla CSS design system, glassmorphism, responsive grid layouts, and a dark/light mode toggle.
- **RESTful API:** Node.js/Express backend with JWT-based authentication.
- **Database:** MongoDB schemas designed for complex relationships between Users, Students, Companies, and Placement Drives.

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a MongoDB Atlas URI)

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd uiet-placement-system
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Setup Environment Variables:
   Open `backend/.env` and ensure your `MONGO_URI` is correct.

### Running the Application

Start the backend server (which also serves the frontend static files):

```bash
npm start
```
Or for development with auto-restart:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5000`.

## Directory Structure
- `/backend`: Express.js server, Mongoose models, authentication controllers, and routes.
- `/frontend`: Static HTML, CSS, and Vanilla JavaScript files.
  - `index.html`: Landing page.
  - `login.html`: Unified Login/Registration portal.
  - `*-dashboard.html`: Respective dashboards for TPO, Student, and Company.
