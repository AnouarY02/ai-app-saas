# WeatherApp

## Introduction
WeatherApp is a SaaS application that provides weather information using a microservices architecture.

## Prerequisites
- Docker
- Docker Compose

## Installation
Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/AnouarY02/ai-app-saas.git
cd ai-app-saas
```

## Configuration
Ensure you have the following environment variables set in a `.env` file:

```
JWT_SECRET=your_jwt_secret
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=appdb
WEATHER_API_KEY=your_weather_api_key
```

## Running the Application
To start the application, run:

```bash
docker-compose up --build
```

- Frontend will be available at `http://localhost:3000`
- Backend will be available at `http://localhost:4000`
- Database will be running on port `5432`

## Testing
Run tests using:

```bash
docker-compose exec backend npm test
```

## Deployment
Deploy the application using your preferred cloud provider with Docker support.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.