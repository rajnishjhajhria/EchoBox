# EchoBox

EchoBox is a full-stack campus feedback platform built with MongoDB, Express, React, and Node.js. Users can register, share feedback across categories, vote, report posts, comment on discussions, and access an admin dashboard for moderation and platform insights.

## Features

- Anonymous-style campus feedback posts across categories like `Student Life`, `Teacher`, `Event`, and `Facility`
- User registration and login
- Upvotes, downvotes, comments, and reporting
- Admin dashboard with total users, total feedback, most active category, and system notifications
- Automatic backend seeding for starter feedback data and a default admin user

## Project Structure

```text
EchoBox/
|-- backend/
|   |-- models/
|   |-- routes/
|   |-- seed.js
|   |-- seedAdmin.js
|   `-- server.js
|-- frontend/
|   |-- src/
|   `-- package.json
`-- README.md
```

## Prerequisites

- Node.js 16 or newer
- npm
- MongoDB 

## Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running Locally

### Start the backend

From the `backend` folder:

```bash
node server.js
```

When the backend starts, it will:

- connect to MongoDB
- create the default admin user if it does not already exist
- insert starter feedback posts only if the posts collection is empty

Default seeded admin credentials:

- Username: `admin`
- Password: `password`

### Start the frontend

From the `frontend` folder:

```bash
npm run dev
```

## Manual Seeding

If you ever want to run the seed files directly from the `backend` folder:

```bash
node seed.js
node seedAdmin.js
```

These scripts are safe to rerun:

- `seed.js` skips inserting posts if posts already exist
- `seedAdmin.js` skips creating the admin user if it already exists

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
node server.js
node seed.js
node seedAdmin.js
```

## Admin Panel Notes

- The `Total Users` card is populated from backend user data
- The `Total Feedback` card is based on stored posts
- `Most Active Category` is calculated from the current posts list
- System notifications are fetched from the backend notifications endpoint

## Tech Stack

- React
- Vite
- React Router
- Axios
- Node.js
- Express
- MongoDB
- Mongoose
- Vanilla CSS
