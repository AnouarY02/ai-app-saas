# Test App

## Project Overview
A modern React single-page application, built with Vite and TypeScript. This project is designed as a frontend-only static site, suitable for SaaS and AI-driven interfaces.

## Tech Stack
- React
- TypeScript
- Vite
- ESLint
- Prettier

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AnouarY02/ai-app-saas.git
   cd ai-app-saas
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```

## Available Scripts
- `npm run dev` — Start the Vite development server.
- `npm run build` — Build the app for production.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint on the codebase.
- `npm run format` — Format code using Prettier.

## Development Workflow
- Commit early and often.
- Use `npm run lint` and `npm run format` before pushing code.
- Pull the latest changes from `main` regularly.

## Building for Production
To build the app for production:
```sh
npm run build
```
The output will be in the `dist/` directory inside the `frontend/` folder.

## Deployment
You can deploy the production build using any static site host (e.g., Vercel, Netlify, GitHub Pages) or via Docker Compose:

```sh
docker-compose up --build
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure
- `frontend/` — React app source code
- `shared/` — Shared utilities/types (if any)
- `infra/` — Infrastructure and configuration files

## Contributing
Pull requests are welcome! Please open an issue first to discuss any major changes.

## License
[MIT](LICENSE)
