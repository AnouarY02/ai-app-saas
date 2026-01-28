# TaskFlow Pro

## Introduction
TaskFlow Pro is a comprehensive task management application designed to streamline your workflow and enhance productivity.

## Features
- Task creation and management
- User authentication
- Real-time updates

## Installation

### Prerequisites
- Docker
- Docker Compose

### Environment Variables
Ensure you have the following environment variables set:
- `DATABASE_URL`: Connection string for the PostgreSQL database
- `JWT_SECRET`: Secret key for JWT authentication
- `NODE_ENV`: Set to `production` or `development`

## Running the Application

### Development
To run the application in development mode, use the following command:
```bash
docker-compose up --build
```

### Production
For production, ensure all environment variables are set and run:
```bash
docker-compose up -d
```

## Testing
Run tests using:
```bash
docker-compose exec backend npm test
```

## Deployment
Deploy the application using your preferred CI/CD pipeline and ensure Docker is configured on the target environment.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Port Mappings
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Database: localhost:5432
