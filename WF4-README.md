# WF4 – Auto-Fix & Run

> Automatische workflow die WF3-output analyseert, alle fouten fixt, en de app bouwt en draait.

## Wat doet WF4?

WF4 pakt de rauwe code van WF3 en maakt er een **werkende, deploybare applicatie** van. Het doet in ~2 minuten wat een developer handmatig 30+ minuten kost.

## Pipeline (31 nodes)

```
POST /wf4/fix
    │
    ▼
┌─────────────────────────┐
│  1. Normalize Input     │  buildId, repo, branch
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  2. Read All Source     │  GitHub Tree API → alle bestanden
│     Files               │  Filter: backend/, frontend/, shared/, config
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  3. AI Error Analysis   │  GPT-4o scant ALLE code op issues
│     (OpenAI)            │  Output: categorized error report
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  4. AI Fix Backend      │  Genereert alle gefixte backend files
│     (OpenAI)            │  package.json, tsconfig, controllers, etc.
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  5. AI Fix Frontend     │  Genereert alle gefixte frontend files
│     (OpenAI)            │  React 18, Tailwind, Vite, alle pages
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  6. AI Fix Shared/Infra │  Genereert shared lib + Dockerfiles
│     (OpenAI)            │  docker-compose, nginx, healthchecks
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  7. Merge & Validate    │  Combineert alles, checkt completeness
│                         │  40+ required files checklist
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  8. Push to GitHub      │  Git Blobs → Tree → Commit → Update Ref
│                         │  Atomic commit met alle fixes
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  9. Build & Deploy      │  Triggert wf4-runner (Docker build)
│                         │  Pollt status elke 15s, max 5 min
└────────┬────────────────┘
         ▼
┌─────────────────────────┐
│  10. Result             │  SUCCESS → URLs + summary
│                         │  FAIL → error logs + suggestion
└─────────────────────────┘
```

## Welke fouten fixt WF4?

### Backend (15 fix-patronen)
| # | Issue | Fix |
|---|-------|-----|
| 1 | `@/` path aliases die niet werken at runtime | Relatieve imports (`./routes/authRoutes`) |
| 2 | `ts-node` traag of crasht met ESM | `tsx` als dev runner |
| 3 | Missende dependencies in package.json | Alle deps toevoegen (bcrypt, cors, jwt, zod, etc.) |
| 4 | `strict: true` in tsconfig veroorzaakt errors | `strict: false`, `skipLibCheck: true` |
| 5 | Service methods ontbreken | Volledige CRUD: findAll, findById, create, update, delete |
| 6 | Passwords niet gehashed | bcrypt.hash() in register, bcrypt.compare() in login |
| 7 | PasswordHash in API responses | `delete user.passwordHash` voor elke response |
| 8 | Routes niet geregistreerd in app.ts | Alle route files importeren en mounten |
| 9 | Health endpoint ontbreekt | GET /api/health → { status: 'ok' } |
| 10 | Error handler middleware kapot | Proper Express error handler (err, req, res, next) |
| 11 | Seed file referenties kloppen niet | Correcte model/service method calls |
| 12 | Missing `esModuleInterop` | Toevoegen aan tsconfig.json |
| 13 | JWT secret hardcoded | Uit environment variables |
| 14 | CORS niet geconfigureerd | cors() middleware met juiste origins |
| 15 | Models zonder UUID | uuid package voor ID generatie |

### Frontend (16 fix-patronen)
| # | Issue | Fix |
|---|-------|-----|
| 1 | `ReactDOM.render()` (React 17) | `createRoot()` (React 18) |
| 2 | Geen BrowserRouter wrapper | Toevoegen in App.tsx |
| 3 | Geen AuthProvider wrapper | Toevoegen rond routes |
| 4 | `process.env` in Vite | `import.meta.env.VITE_API_URL` |
| 5 | Geen axios/fetch wrapper | apiClient met axios + interceptors |
| 6 | postcss.config.js ontbreekt | Aanmaken met tailwindcss + autoprefixer |
| 7 | Tailwind directives missen in CSS | `@tailwind base/components/utilities` |
| 8 | Tailwind content paths missen | `['./index.html', './src/**/*.{tsx}']` |
| 9 | UI components zijn lege placeholders | Echte functional components met styling |
| 10 | Layouts accepteren geen children | `React.PropsWithChildren` type |
| 11 | vite.config.ts mist path alias | `resolve.alias: { '@': './src' }` |
| 12 | Missende dependencies | axios, clsx, tailwind-merge, autoprefixer, postcss |
| 13 | Pages zonder state/API calls | useState + useEffect + apiClient calls |
| 14 | TypeScript types te strict | Relaxed tsconfig voor gegenereerde code |
| 15 | vite-env.d.ts mist types | ImportMetaEnv interface declaratie |
| 16 | index.html structuur kapot | Proper HTML5 + root div + module script |

### Shared (5 fix-patronen)
| # | Issue | Fix |
|---|-------|-----|
| 1 | Zod dependency ontbreekt | Toevoegen aan package.json |
| 2 | tsconfig.json verkeerd | Proper composite/declaration config |
| 3 | Barrel exports missen | Clean index.ts met alle re-exports |
| 4 | Types matchen niet met backend | Synchronized interfaces |
| 5 | Validators niet geexporteerd | Zod schemas + helper functions |

### Docker/Infra (6 fix-patronen)
| # | Issue | Fix |
|---|-------|-----|
| 1 | Frontend Dockerfile mist VITE_API_URL | ARG + ENV voor build-time variable |
| 2 | nginx.default.conf ontbreekt | Inline nginx config in Dockerfile |
| 3 | Backend Dockerfile geen healthcheck | HEALTHCHECK met wget |
| 4 | docker-compose mist health checks | service_healthy conditions |
| 5 | .env.example ontbreekt of incompleet | Alle required env vars |
| 6 | SPA routing werkt niet | try_files $uri /index.html in nginx |

## API

### Trigger WF4

```bash
curl -X POST http://n8n:5678/webhook/wf4-fix \
  -H "Content-Type: application/json" \
  -d '{
    "buildId": "build-20260209-161701",
    "repoOwner": "AnouarY02",
    "repoName": "ai-app-saas",
    "branch": "build/build-20260209-161701"
  }'
```

### Response (Success)

```json
{
  "status": "SUCCESS",
  "buildId": "build-20260209-161701",
  "totalFilesFixed": 45,
  "commitSha": "abc123...",
  "frontendUrl": "http://localhost:3000",
  "backendUrl": "http://localhost:4000"
}
```

### Response (Failure)

```json
{
  "status": "FAILED",
  "buildId": "build-20260209-161701",
  "errorReason": "Frontend build failed: missing module...",
  "buildLogs": "...",
  "suggestion": "Check build logs and re-run WF4 with error context"
}
```

## n8n Setup

### Benodigde Credentials
1. **GitHub Token** - HTTP Header Auth: `Authorization: Bearer ghp_...`
2. **OpenAI API Key** - HTTP Header Auth: `Authorization: Bearer sk-...`

### Importeren
1. Open n8n → Settings → Import Workflow
2. Upload `wf4-autofix.json`
3. Configureer credentials
4. Activeer de workflow

### Environment Variables
```
WF4_RUNNER_URL=http://wf4-runner:8787
```

## Architectuur

```
n8n (WF4 workflow)
  ├── GitHub API (lezen/schrijven code)
  ├── OpenAI GPT-4o (4 AI-passes)
  │   ├── Pass 1: Error Analysis
  │   ├── Pass 2: Backend Fix
  │   ├── Pass 3: Frontend Fix
  │   └── Pass 4: Shared + Infra Fix
  └── wf4-runner (Docker build & deploy)
      ├── git clone
      ├── docker-compose build
      ├── docker-compose up
      └── health checks
```

## Kosten per run
- ~4 OpenAI GPT-4o calls × ~8K tokens = ~$0.30-0.50 per run
- GitHub API: gratis (binnen rate limits)
- Totale doorlooptijd: ~2-4 minuten
