# WeatherApp

## Introduction
WeatherApp is a SaaS application that provides weather information.

## Prerequisites
- Docker
- Docker Compose

## Installation
Clone the repository and navigate to the project directory.

## Running the App
To start the application, run:
```
docker-compose up --build
```

## Environment Variables
Ensure the following environment variables are set:
- `DATABASE_URL`
- `JWT_SECRET`
- `WEATHER_API_KEY`

## Docker Setup
The application consists of three services:
- **Frontend**: Accessible at `http://localhost:3000`
- **Backend**: Accessible at `http://localhost:4000`
- **Database**: PostgreSQL running on port `5432`

## Scripts
- `start`: Start the application
- `build`: Compile TypeScript
- `dev`: Start the application in development mode
- `test`: Run tests
- `lint`: Lint the codebase

## Testing
Run tests using:
```
npm test
```

## Contributing
Please read the contributing guidelines.

## License
This project is licensed under the MIT License.