# AI App

## Introduction
AI App is a SaaS application that leverages AI to provide insights and analytics.

## Features
- User authentication and management
- AI-generated insights
- Dashboard for data visualization

## Tech Stack
- Frontend: Next.js 14 with TypeScript, Tailwind CSS, shadcn/ui
- Backend: Next.js API Routes with TypeScript
- Database: PostgreSQL

## Installation
Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/AnouarY02/ai-app-saas.git
cd ai-app-saas
```

## Running the App
To start the application using Docker, run:

```bash
docker-compose up --build
```

This will start the following services:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Database: localhost:5432

## Environment Variables
Ensure you have the following environment variables set:
- `JWT_SECRET`: Secret key for JWT authentication
- `DATABASE_URL`: Connection string for the PostgreSQL database

## Docker Setup
The application uses Docker for containerization. The `docker-compose.yml` file includes services for the frontend, backend, and database.

## Development Scripts
- `dev`: Start the development server
- `build`: Build the application for production
- `start`: Start the application
- `lint`: Run ESLint
- `test`: Run tests with Jest

## API Documentation
API routes are available under `/api` and handle user and insights management.

## Contributing
Contributions are welcome. Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.