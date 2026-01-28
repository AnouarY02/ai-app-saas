# TaskFlow Pro

## Introduction
TaskFlow Pro is a SaaS application designed to streamline task management and enhance productivity.

## Features
- Task management
- User authentication
- Real-time updates

## Installation
Clone the repository and navigate to the project directory.

## Running the App
To start the application, use Docker Compose:

```bash
docker-compose up --build
```

## Environment Variables
Ensure the following environment variables are set:
- `DATABASE_URL`: Connection string for the database
- `JWT_SECRET`: Secret key for JWT authentication
- `PORT`: Port for the backend server

## Docker Setup
The application uses Docker to manage services:
- **Frontend**: Accessible at `localhost:3000`
- **Backend**: Accessible at `localhost:4000`
- **Database**: Accessible at `localhost:5432`

## Scripts
- `start`: Start the application
- `build`: Compile TypeScript
- `dev`: Start the application in development mode
- `test`: Run tests
- `lint`: Lint the codebase
- `format`: Format the codebase

## Testing
Run tests using:

```bash
npm test
```

## Contributing
Contributions are welcome! Please submit a pull request.

## License
This project is licensed under the MIT License.