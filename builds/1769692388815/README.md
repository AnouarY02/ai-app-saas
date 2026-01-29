# TaskMaster

## Introduction
TaskMaster is a SaaS application designed to help you manage tasks efficiently.

## Features
- Task management
- User authentication
- Real-time updates

## Architecture Overview
The application consists of a frontend, backend, and a PostgreSQL database.

## Setup and Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Ensure Docker is installed on your machine.

## Running the Application
To start the application, run:
```
docker-compose up --build
```

## Environment Variables
Ensure the following environment variables are set:
- `DATABASE_URL`: URL for the PostgreSQL database.
- `JWT_SECRET`: Secret key for JWT authentication.
- `NODE_ENV`: Set to `production`.

## Docker Setup
The application uses Docker to manage services:
- **Frontend**: Accessible on port 3000.
- **Backend**: Accessible on port 4000.
- **Database**: Accessible on port 5432.

## Testing
Run tests using:
```
npm test
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.