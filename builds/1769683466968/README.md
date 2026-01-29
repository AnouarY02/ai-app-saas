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

### Setup
Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/AnouarY02/ai-app-saas.git
cd ai-app-saas
```

## Running the Application

### Development
To run the application in development mode, use the following command:

```bash
docker-compose up --build
```

### Production
For production, ensure all environment variables are set and use:

```bash
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

```bash
docker-compose exec backend npm test
```

## Contribution Guidelines
Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.