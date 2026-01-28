# TaskFlow Pro

## Introduction
TaskFlow Pro is a comprehensive solution for managing tasks efficiently.

## Features
- Task management
- User authentication
- Real-time updates

## Installation

### Prerequisites
- Docker
- Docker Compose

### Setup
Clone the repository and navigate to the project directory.

## Running the Application

### Development
To start the application in development mode, use:
```
docker-compose up --build
```

### Production
For production, ensure all environment variables are set and run:
```
docker-compose up -d
```

## Environment Variables
Ensure the following environment variables are set:
- `DATABASE_URL`
- `JWT_SECRET`
- `NODE_ENV`

## Docker Setup
The application consists of three services:
- **Frontend**: Accessible at `http://localhost:3000`
- **Backend**: Accessible at `http://localhost:4000`
- **Database**: PostgreSQL running on port `5432`

## Testing
Run tests using:
```
npm test
```

## Contributing
Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests.

## License
This project is licensed under the MIT License.