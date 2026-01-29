import express from 'express';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execCallback);
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8787;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const builds = new Map();

app.get('/health', (req, res) => res.json({ ok: true, timestamp: new Date().toISOString() }));

app.get('/v1/status', (req, res) => {
  const build = builds.get(req.query.buildId);
  if (!build) return res.status(404).json({ status: 'NOT_FOUND' });
  res.json({ 
    status: build.status, 
    frontendUrl: build.frontendUrl, 
    backendUrl: build.backendUrl, 
    errorReason: build.errorReason, 
    logTail: build.logs.slice(-500) 
  });
});

app.get('/v1/result', (req, res) => {
  const build = builds.get(req.query.buildId);
  if (!build) return res.status(404).json({ error: 'Not found' });
  res.json(build);
});

app.post('/v1/build', async (req, res) => {
  const { buildId, repoOwner, repoName, branch } = req.body;
  builds.set(buildId, { 
    status: 'RUNNING', 
    frontendUrl: null, 
    backendUrl: null, 
    errorReason: null, 
    logs: '' 
  });
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
    const wd = \`/tmp/\${buildId}\`;
    const buildDir = \`\${wd}/builds/\${buildId}\`;
    
    log('🧹 Cleaning up...');
    await exec(\`rm -rf \${wd}\`);
    
    log(\`📦 Cloning \${repoOwner}/\${repoName}@\${branch}...\`);
    await exec(\`git clone --branch \${branch} --depth 1 https://\${GITHUB_TOKEN}@github.com/\${repoOwner}/\${repoName}.git \${wd}\`);
    
    log(\`📂 Build directory: \${buildDir}\`);
    
    try {
      await exec(\`ls -la \${buildDir}\`);
      log('✅ Build directory found');
    } catch (e) {
      throw new Error(\`Build directory not found: \${buildDir}\`);
    }
    
    log('🛑 Stopping existing containers...');
    await exec(\`cd \${buildDir} && docker-compose -p \${buildId} down -v || true\`);
    
    log('🏗️  Building images...');
    await exec(\`cd \${buildDir} && docker-compose -p \${buildId} build --no-cache\`, { timeout: 600000 });
    
    log('🚀 Starting containers...');
    await exec(\`cd \${buildDir} && docker-compose -p \${buildId} up -d\`);
    
    log('⏳ Waiting for services (15s)...');
    await new Promise(r => setTimeout(r, 15000));
    
    log('🔍 Getting container ports...');
    const fp = (await exec(\`docker ps --filter name=\${buildId} --filter name=frontend --format "{{.Ports}}" | grep -oP '\\\\d+(?=->)' | head -1\`)).stdout.trim();
    const bp = (await exec(\`docker ps --filter name=\${buildId} --filter name=backend --format "{{.Ports}}" | grep -oP '\\\\d+(?=->)' | head -1\`)).stdout.trim();
    
    if (!fp || !bp) {
      const containers = (await exec(\`docker ps --filter name=\${buildId} --format "{{.Names}}\\t{{.Status}}"\`)).stdout;
      log(\`Containers:\\n\${containers}\`);
      throw new Error('Could not find container ports. Check if containers started.');
    }
    
    build.frontendUrl = \`http://localhost:\${fp}\`;
    build.backendUrl = \`http://localhost:\${bp}\`;
    build.status = 'PASS';
    
    log('═══════════════════════════════════════');
    log('✅ BUILD SUCCESS!');
    log('═══════════════════════════════════════');
    log(\`Frontend: \${build.frontendUrl}\`);
    log(\`Backend:  \${build.backendUrl}\`);
    log('═══════════════════════════════════════');
    
  } catch (e) {
    build.status = 'FAIL';
    build.errorReason = e.message;
    log(\`❌ FAILED: \${e.message}\`);
  }
}

app.listen(PORT, () => console.log(\`WF4 Runner on port \${PORT}\`));
