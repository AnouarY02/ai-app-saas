# Padel Club Pro

## Project Overview
Padel Club Pro is a modern SaaS landing page for padel clubs, built with React and Vite. It provides a fast, responsive, and easily customizable template for club promotion.

## Tech Stack
- React
- Vite
- TypeScript
- ESLint
- Prettier

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Copy environment variables:**
   (No environment variables required for this project)

## Development Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the codebase
- `npm run format` — Format the codebase with Prettier

## Building for Production
To build the app for production:
```bash
npm run build
```
The output will be in the `dist/` directory inside `frontend/`.

## Running with Docker
1. Build and run the frontend service:
   ```bash
   docker-compose up --build
   ```
2. The app will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure
- `frontend/` — React app source code
- `shared/` — Shared code (if any)
- `infra/` — Infrastructure and configuration files

## Contributing
Contributions are welcome! Please open issues or submit pull requests.

## License
MIT
