# TaskFlow Pro

## Introduction
TaskFlow Pro is a comprehensive application designed to streamline task management and enhance productivity.

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

### Development Mode
To run the application in development mode, use the following command:

```bash
docker-compose up --build
```

### Production Mode
For production, ensure all environment variables are set and run:

```bash
docker-compose up -d
```

## Environment Variables
Ensure the following environment variables are set:
- `DATABASE_URL`: URL for the PostgreSQL database
- `JWT_SECRET`: Secret key for JWT authentication
- `NODE_ENV`: Set to `production` or `development`

## Docker Setup
The application consists of three services:
- **Frontend**: Accessible at `http://localhost:3000`
- **Backend**: Accessible at `http://localhost:4000`
- **Database**: PostgreSQL running on port `5432`

## Testing
Run tests using:

```bash
npm test
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.