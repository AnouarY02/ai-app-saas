# WF4 Runner
Quick start:
docker build -t wf4-runner .
docker run -d --name wf4-runner -p 8787:8787 -v /var/run/docker.sock:/var/run/docker.sock -e GITHUB_TOKEN=xxx wf4-runner
