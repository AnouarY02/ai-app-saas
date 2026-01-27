# Test App - Full Validation

## Introduction
This application is a SaaS platform built using modern web technologies including React for the frontend and Express for the backend. It uses PostgreSQL for data persistence.

## Installation
Ensure you have Docker and Docker Compose installed on your machine.

## Running the App
To start the application, run the following command in the root of the project:

```bash
docker-compose up --build
```

This will start the frontend, backend, and database services.

## Environment Variables
The application requires the following environment variables:
- `JWT_SECRET`: Secret key for JWT
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

Optional:
- `PORT`: Port for the backend service (default is 4000)
- `LOG_LEVEL`: Logging level

## Docker Setup
- Frontend is accessible on port 3000
- Backend is accessible on port 4000
- Database is accessible on port 5432

## Scripts
- `start`: Start the application
- `build`: Build the application
- `dev`: Start the application in development mode
- `test`: Run tests
- `lint`: Lint the codebase

## Testing
To run tests, use the following command:

```bash
npm test
```

## Contributing
Please fork the repository and submit a pull request for any contributions.

## License
This project is licensed under the MIT License.