# Xeno CRM

A modern Customer Relationship Management (CRM) system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication with Google OAuth
- Contact management
- Task tracking
- Campaign management
- AI-powered audience segmentation

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Google OAuth credentials

## Setup

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd xeno-crm
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in the required credentials

4. Start the development servers:
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory (new terminal)
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Security

- Never commit sensitive information to version control
- Always use environment variables for configuration
- Keep your dependencies up to date
- Follow security best practices for production deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Third-Party Attributions

See [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) for a list of third-party libraries used in this project.
