# WF4 Runner
Quick start:
\`\`\`bash
export GITHUB_TOKEN=your_token
docker build -t wf4-runner .
docker run -d --name wf4-runner -p 8787:8787 -v /var/run/docker.sock:/var/run/docker.sock -e GITHUB_TOKEN=\$GITHUB_TOKEN wf4-runner
\`\`\`
