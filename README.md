# Book Management API

## Overview

Book Management API built with Express.js, Prisma ORM, and Node.js. It will help learn more on PRISMA ORM and how to design its models, together with rate limiting, bot detection and secure authorization.

## Features

- Prisma ORM Integration
- Automated email workflow
- User Authentication
- Book CRUD Operations
- Review Management
- Secure Route Protection
- Environment Configuration

## Prerequisites

- Node.js 
- npm 
- MySQL or compatible database

## Tech Stack

- **Backend**: Express.js
- **ORM**: Prisma
- **Workflow**: Upstash
- **Authentication**: JSON Web Tokens (JWT)
- **Encryption**: Bcryptjs
- **Database**: MySQL
- **Security**: Arcjet Middleware

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd xample
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="time"
ARCJET_KEY=<your_acjet_api_key>
ARCJET_ENV=<your_environment>
QSTASH_URL=<your_token_url>
QSTASH_TOKEN=<your_token_key>
```

### 4. Database Setup

Initialize Prisma and run migrations:

```bash
npx prisma migrate dev
```

### 5. Run the Application

Development Mode:
```bash
npm run dev
```

Production Mode:
```bash
npm start
```

## API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /register`: User registration
- `POST /login`: User login

### User Routes (`/api/v1/users`)
- `GET /profile`: Get user profile
- `PUT /profile`: Update user profile

### Book Routes (`/api/v1/books`)
- `GET /`: View all books
- `GET /:id`: View a specific book
- `POST /`: Add a new book (requires authentication)
- `PUT /:id`: Update a book
- `DELETE /:id`: Delete a book

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The application uses a centralized error middleware to handle and standardize error responses.

## Security

- JWT-based authentication
- Arcjet middleware for additional request protection
- Password hashing with bcrypt
- Environment-based configuration

## Development Scripts

- `npm run dev`: Start development server
- `npm start`: Start production server
- `npm run migrate`: Run Prisma database migrations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License**.  
