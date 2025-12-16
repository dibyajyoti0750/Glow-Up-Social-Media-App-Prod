# GlowUp

GlowUp is a full stack social media platform built with the MERN stack. It focuses on user generated content, modern UI interactions, and secure authentication, providing a smooth and responsive social experience.

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Clerk Authentication
- Axios
- Material UI
- Lucide Icons
- Motion animations
- Moment.js
- React Hot Toast

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- Clerk for authentication
- ImageKit for media storage
- Multer for file uploads
- Inngest for background jobs
- Nodemailer for email handling
- CORS
- dotenv

## Features

- Secure user authentication and session management using Clerk
- User profile creation and management
- Friends and connection system for building social networks
- Direct messaging system powered by Server Sent Events for real time communication
- Stories feature for sharing time limited content
- Image uploads and media handling with optimized storage
- Feed based content system for posts and updates
- Smooth real time UI interactions and animations
- Background job processing using Inngest
- Email notifications for important user actions

## Project Structure

```
/frontend   React client
/backend    Express API server
```

## Setup Instructions

### Clone the repository

```
git clone <repo-url>
cd glowup
```

### Frontend setup

```
cd frontend
npm install
npm run dev
```

### Backend setup

```
cd backend
npm install
npm run dev
```

Create a `.env` file in the backend directory and configure environment variables for MongoDB, Clerk, ImageKit, and email services.

## Status

GlowUp is an actively developed social media platform project built to practice scalable full stack architecture.
