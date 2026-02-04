# AI App

## Introduction

AI App is a SaaS application designed to provide insights and analytics using a modern tech stack.

## Features
- User authentication
- Dashboard with insights
- Responsive UI with Tailwind CSS

## Tech Stack
- Frontend: Next.js 14 with TypeScript, Tailwind CSS, shadcn/ui
- Backend: Next.js API Routes
- Database: PostgreSQL

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/AnouarY02/ai-app-saas.git
cd ai-app-saas
```

## Running Locally

Ensure you have Docker installed. Run the following command to start the application:

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Database: localhost:5432

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

## Docker Setup

The application uses Docker to manage services:
- **Frontend**: Runs on port 3000
- **Backend**: Runs on port 4000
- **Database**: PostgreSQL running on port 5432

## Scripts

- `dev`: Starts the development server
- `build`: Builds the application
- `start`: Starts the application
- `lint`: Lints the codebase
- `test`: Runs tests

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.