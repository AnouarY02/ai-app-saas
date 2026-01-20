import express from 'express';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCallback);
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8787;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// In-memory build state
const builds = new Map();

// ========================================
// HEALTH CHECK
// ========================================
app.get('/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// ========================================
// GET BUILD STATUS
// ========================================
app.get('/v1/status', (req, res) => {
  const { buildId } = req.query;
  
  if (!buildId) {
    return res.status(400).json({ error: 'buildId required' });
  }

  const build = builds.get(buildId);
  
  if (!build) {
    return res.status(404).json({ 
      status: 'NOT_FOUND',
      buildId 
    });
  }

  res.json({
    status: build.status,
    frontendUrl: build.frontendUrl,
    backendUrl: build.backendUrl,
    errorReason: build.errorReason,
    logTail: build.logs.slice(-500)
  });
});

// ========================================
// GET BUILD RESULT
// ========================================
app.get('/v1/result', (req, res) => {
  const { buildId } = req.query;
  
  if (!buildId) {
    return res.status(400).json({ error: 'buildId required' });
  }

  const build = builds.get(buildId);
  
  if (!build) {
    return res.status(404).json({ error: 'Build not found' });
  }

  res.json({
    status: build.status,
    frontendUrl: build.frontendUrl,
    backendUrl: build.backendUrl,
    errorReason: build.errorReason,
    logs: build.logs
  });
});

// ========================================
// PERSIST RESULT
// ========================================
app.post('/v1/persistResult', (req, res) => {
  const { buildId, result } = req.body;
  
  if (!buildId || !result) {
    return res.status(400).json({ error: 'buildId and result required' });
  }

  const build = builds.get(buildId);
  
  if (build) {
    Object.assign(build, result);
    console.log(`✅ Persisted result for ${buildId}`);
  }

  res.json({ ok: true });
});

// ========================================
// START BUILD
// ========================================
app.post('/v1/build', async (req, res) => {
  const { buildId, repoOwner, repoName, branch, mode } = req.body;

  if (!buildId || !repoOwner || !repoName || !branch) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['buildId', 'repoOwner', 'repoName', 'branch']
    });
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 BUILD STARTED: ${buildId}`);
  console.log(`   Repo: ${repoOwner}/${repoName}`);
  console.log(`   Branch: ${branch}`);
  console.log(`   Mode: ${mode}`);
  console.log(`${'='.repeat(60)}\n`);

  // Initialize build state
  builds.set(buildId, {
    status: 'RUNNING',
    frontendUrl: null,
    backendUrl: null,
    errorReason: null,
    logs: '',
    startedAt: Date.now()
  });

  // Start async build
  runBuild(buildId, repoOwner, repoName, branch).catch(err => {
    console.error(`❌ Build ${buildId} failed:`, err);
    const build = builds.get(buildId);
    if (build) {
      build.status = 'FAIL';
      build.errorReason = err.message;
      build.logs += `\n\nFATAL ERROR: ${err.message}\n${err.stack}`;
    }
  });

  res.json({ ok: true, buildId, status: 'RUNNING' });
});

// ========================================
// BUILD RUNNER (Async)
// ========================================
async function runBuild(buildId, repoOwner, repoName, branch) {
  const build = builds.get(buildId);
  
  const log = (msg) => {
    console.log(msg);
    build.logs += msg + '\n';
  };

  try {
    // Step 1: Clone repo
    log('📦 Step 1/6: Cloning repository...');
    const workDir = `/tmp/${buildId}`;
    const repoUrl = `https://${GITHUB_TOKEN}@github.com/${repoOwner}/${repoName}.git`;
    
    await exec(`rm -rf ${workDir}`);
    await exec(`git clone --branch ${branch} --depth 1 ${repoUrl} ${workDir}`);
    log(`✅ Repository cloned to ${workDir}`);

    // Step 2: Check for docker-compose
    log('📦 Step 2/6: Checking docker-compose.yml...');
    try {
      await exec(`test -f ${workDir}/docker-compose.yml`);
      log('✅ Found docker-compose.yml');
    } catch {
      throw new Error('docker-compose.yml not found in repository');
    }

    // Step 3: Stop existing containers
    log('📦 Step 3/6: Cleaning up old containers...');
    try {
      await exec(`cd ${workDir} && docker-compose -p ${buildId} down -v`, { timeout: 30000 });
      log('✅ Old containers stopped');
    } catch (err) {
      log(`⚠️  No old containers: ${err.message}`);
    }

    // Step 4: Build containers
    log('📦 Step 4/6: Building Docker containers...');
    const { stdout: buildOutput } = await exec(
      `cd ${workDir} && docker-compose -p ${buildId} build --no-cache`,
      { timeout: 600000, maxBuffer: 10 * 1024 * 1024 }
    );
    log(buildOutput);
    log('✅ Containers built');

    // Step 5: Start containers
    log('📦 Step 5/6: Starting containers...');
    await exec(`cd ${workDir} && docker-compose -p ${buildId} up -d`);
    log('✅ Containers started');

    // Step 6: Get ports & health check
    log('📦 Step 6/6: Health checks...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    const frontendPort = await getContainerPort(buildId, 'frontend', 80);
    const backendPort = await getContainerPort(buildId, 'backend', 3000);

    build.frontendUrl = `http://localhost:${frontendPort}`;
    build.backendUrl = `http://localhost:${backendPort}`;

    log(`✅ Frontend: ${build.frontendUrl}`);
    log(`✅ Backend: ${build.backendUrl}`);

    // Health checks
    try {
      const backendHealth = await fetch(`${build.backendUrl}/health`);
      if (!backendHealth.ok) throw new Error('Backend health check failed');
      log('✅ Backend health check PASSED');
    } catch (err) {
      log(`⚠️  Backend health: ${err.message}`);
    }

    try {
      const frontendHealth = await fetch(build.frontendUrl);
      if (!frontendHealth.ok) throw new Error('Frontend health check failed');
      log('✅ Frontend health check PASSED');
    } catch (err) {
      log(`⚠️  Frontend health: ${err.message}`);
    }

    build.status = 'PASS';
    log('\n🎉 BUILD COMPLETE!\n');

  } catch (err) {
    log(`\n❌ BUILD FAILED: ${err.message}\n`);
    build.status = 'FAIL';
    build.errorReason = err.message;
    throw err;
  }
}

// ========================================
// HELPER: Get Container Port
// ========================================
async function getContainerPort(buildId, serviceName, internalPort) {
  const containerName = `${buildId}_${serviceName}_1`;
  
  try {
    const { stdout } = await exec(
      `docker port ${containerName} ${internalPort} | cut -d: -f2`
    );
    return stdout.trim();
  } catch {
    const { stdout } = await exec(
      `docker ps --filter name=${buildId} --filter name=${serviceName} --format "{{.Ports}}" | grep -oP '\\d+(?=->)' | head -1`
    );
    return stdout.trim();
  }
}

// ========================================
// START SERVER
// ========================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   WF4 RUNNER SERVICE                   ║
║   Port: ${PORT}                         ║
║   Status: READY                        ║
╚════════════════════════════════════════╝
  `);
});
