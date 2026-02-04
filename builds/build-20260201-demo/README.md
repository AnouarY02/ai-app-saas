# ShiftPlannerPro

## Introduction
ShiftPlannerPro is a comprehensive application designed to manage employee shifts efficiently.

## Features
- Manage employees and shifts
- User-friendly interface
- API for employee and shift management

## Installation
Ensure you have Docker and Docker Compose installed on your machine.

## Running Locally
To run the application locally, use the following command:
```bash
docker-compose up --build
```
This will start the frontend on port 3000, the backend on port 4000, and the database on port 5432.

## Building for Production
To build the application for production, use:
```bash
docker-compose build
```

## Environment Variables
The application requires the following environment variables:
- `NODE_ENV`: Set to `production` for production environments.
- `PORT`: The port on which the backend server runs.

## Docker Setup
The application is containerized using Docker. It includes three services:
- **Frontend**: Accessible on port 3000
- **Backend**: Accessible on port 4000
- **Database**: PostgreSQL database accessible on port 5432

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.