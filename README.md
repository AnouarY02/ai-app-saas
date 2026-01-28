# TaskFlow Pro

## Overview
TaskFlow Pro is a comprehensive application designed to streamline task management and enhance productivity.

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Installation
Clone the repository and navigate to the project directory.

### Running the App
To start the application, run:
```
docker-compose up --build
```
This will start the frontend on port 3000, the backend on port 4000, and the database on port 5432.

## Scripts
- `start`: Start the application
- `build`: Compile the TypeScript code
- `dev`: Start the application in development mode
- `test`: Run tests
- `lint`: Lint the codebase
- `format`: Format the codebase

## Environment Variables
- `DATABASE_URL`: URL for the database connection
- `JWT_SECRET`: Secret key for JWT
- `NODE_ENV`: Environment (e.g., production)
- `PORT`: Port number (optional)
- `LOG_LEVEL`: Log level (optional)

## Docker Setup
The application is containerized using Docker. It includes three services:
- **Frontend**: Accessible at `http://localhost:3000`
- **Backend**: Accessible at `http://localhost:4000`
- **Database**: PostgreSQL running on port 5432

## Testing
Run `npm test` to execute the test suite.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.