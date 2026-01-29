# WeatherApp

## Overview
WeatherApp is a SaaS application that provides weather forecasts and related information.

## Features
- Real-time weather updates
- Forecast for multiple locations
- User-friendly interface

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

## Running the App

### Development
To start the application in development mode, use the following command:

```bash
docker-compose up --build
```

### Production
For production, ensure all environment variables are set correctly and run:

```bash
docker-compose up -d
```

## Environment Variables
Ensure the following environment variables are set:
- `NODE_ENV`: Set to `production` or `development`
- `PORT`: Port for the backend service
- `JWT_SECRET`: Secret key for JWT authentication
- `DATABASE_URL`: Database connection string

## Docker Setup
The application uses Docker Compose to manage services:
- **Frontend**: Accessible on port 3000
- **Backend**: Accessible on port 4000
- **Database**: PostgreSQL database accessible on port 5432

## Testing
Run tests using:

```bash
docker-compose exec backend npm test
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.