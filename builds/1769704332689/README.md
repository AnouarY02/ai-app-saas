# WeatherApp

## Introduction
WeatherApp is a SaaS application that provides weather forecasts and related services.

## Features
- Real-time weather updates
- Forecast predictions
- User authentication

## Architecture Overview
The application consists of a frontend, backend, and a PostgreSQL database.

## Installation
Clone the repository and navigate to the project directory.

## Environment Setup
Create a `.env` file in the root directory and configure the following variables:
```
JWT_SECRET=your_jwt_secret
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=appdb
API_KEY=your_api_key
```

## Running the Application
To start the application, run:
```
docker-compose up --build
```
- Frontend will be available at `http://localhost:3000`
- Backend will be available at `http://localhost:4000`
- Database will be accessible on port `5432`

## Testing
Run tests using:
```
npm test
```

## Deployment
Instructions for deploying the application will be provided in future updates.

## Contributing
Contributions are welcome! Please submit a pull request.

## License
This project is licensed under the MIT License.