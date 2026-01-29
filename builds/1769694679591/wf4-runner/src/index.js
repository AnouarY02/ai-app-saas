import express from 'express';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execCallback);
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8787;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const builds = new Map();

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/v1/status', (req, res) => {
  const build = builds.get(req.query.buildId);
  if (!build) return res.status(404).json({ status: 'NOT_FOUND' });
  res.json({ status: build.status, frontendUrl: build.frontendUrl, backendUrl: build.backendUrl, errorReason: build.errorReason, logTail: build.logs.slice(-500) });
});

app.get('/v1/result', (req, res) => {
  const build = builds.get(req.query.buildId);
  if (!build) return res.status(404).json({ error: 'Not found' });
  res.json(build);
});

app.post('/v1/persistResult', (req, res) => {
  const build = builds.get(req.body.buildId);
  if (build) Object.assign(build, req.body.result);
  res.json({ ok: true });
});

app.post('/v1/build', async (req, res) => {
  const { buildId, repoOwner, repoName, branch } = req.body;
  builds.set(buildId, { status: 'RUNNING', frontendUrl: null, backendUrl: null, errorReason: null, logs: '' });
  runBuild(buildId, repoOwner, repoName, branch).catch(e => {
    const b = builds.get(buildId);
    if (b) { b.status = 'FAIL'; b.errorReason = e.message; }
  });
  res.json({ ok: true, buildId, status: 'RUNNING' });
});

async function runBuild(buildId, repoOwner, repoName, branch) {
  const build = builds.get(buildId);
  const log = m => { console.log(m); build.logs += m + '\\n'; };
  try {
    log('Cloning...');
    const wd = \`/tmp/\${buildId}\`;
    await exec(\`rm -rf \${wd}\`);
    await exec(\`git clone --branch \${branch} --depth 1 https://\${GITHUB_TOKEN}@github.com/\${repoOwner}/\${repoName}.git \${wd}\`);
    log('Building...');
    await exec(\`cd \${wd} && docker-compose -p \${buildId} down -v || true\`);
    await exec(\`cd \${wd} && docker-compose -p \${buildId} build\`, { timeout: 600000 });
    await exec(\`cd \${wd} && docker-compose -p \${buildId} up -d\`);
    await new Promise(r => setTimeout(r, 10000));
    const fp = (await exec(\`docker ps --filter name=\${buildId} --filter name=frontend --format "{{.Ports}}" | grep -oP '\\\\d+(?=->)' | head -1\`)).stdout.trim();
    const bp = (await exec(\`docker ps --filter name=\${buildId} --filter name=backend --format "{{.Ports}}" | grep -oP '\\\\d+(?=->)' | head -1\`)).stdout.trim();
    build.frontendUrl = \`http://localhost:\${fp}\`;
    build.backendUrl = \`http://localhost:\${bp}\`;
    build.status = 'PASS';
    log('DONE');
  } catch (e) {
    build.status = 'FAIL';
    build.errorReason = e.message;
    log('FAILED: ' + e.message);
  }
}

app.listen(PORT, () => console.log(\`Runner on \${PORT}\`));
