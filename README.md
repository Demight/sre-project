# sre-project
This contains steps, actions and process of building app, deployment, monitoring impleations and other SRE practises from scratch 

# 🔧 SRE Demo Project: Web App with Observability and Reliability

## 📌 Project Goals
- Deploy a web app on Kubernetes
- Set up observability (metrics, logs, alerts)
- Define and monitor SLOs
- Simulate an incident and generate a postmortem

## 🛠️ Tech Stack
- Node.js, Docker, Kubernetes (GKE or minikube)
- Prometheus, Grafana, Loki, Fluent Bit
- GitHub Actions, Terraform, Alertmanager

## 🚀 Features
- 📦 CI/CD Pipeline via GitHub Actions
- 📈 Metrics dashboards in Grafana
- 📜 Log aggregation with Fluent Bit + Loki
- 📐 SLO tracking and error budget
- 🚨 Real-time alerts via Prometheus
- 🧾 Postmortem documentation

## 📂 Structure
- `/app` – Sample Node.js app
- `/k8s` – Kubernetes manifests
- `/terraform` – Infrastructure as Code
- `.github/workflows` – CI/CD pipelines
- `/dashboards` – Grafana dashboards (JSON)
- `/alerts` – Prometheus alert rules
- `/postmortems` – Incident reports

## ✅ Getting Started
1. Clone the repo
2. Deploy app to your Kubernetes cluster
3. Deploy monitoring stack (Prometheus, Grafana, Loki)
4. Setup CI/CD pipeline using GitHub Actions
5. Define SLIs/SLOs and test alerts
6. Simulate an incident & write postmortem

## 🧠 SRE Focus Areas
- Reliability Engineering
- Incident Management
- Observability
- Infrastructure as Code

##  Quick deployment steps
# Build & push image
cd app
docker build -t docker.io/<YOUR_USERNAME>/sre-demo-app:latest .
docker push docker.io/<YOUR_USERNAME>/sre-demo-app:latest

# Create namespace and apply manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml
(#)(optional) kubectl apply -f k8s/ingress.yaml

# verify
kubectl -n sre-demo get pods
kubectl -n sre-demo get svc
kubectl -n sre-demo get hpa
kubectl -n sre-demo port-forward svc/sre-demo-service 8080:80  # then visit http://localhost:8080

# comfirm metric
If you port-forward or have Prometheus scraping, request http://localhost:8080/metrics (or the pod IP:3000/metrics) and you should see Prometheus metrics including http_request_duration_seconds_bucket and http_requests_total.

# Simple load test (to trigger HPA / alerts)
test with hey
(# )install hey if missing: go install github.com/rakyll/hey@latest
hey -z 30s -c 50 http://<INGRESS_HOST_OR_CLUSTER_IP>/


## next step
Next steps I recommend (so you can complete the SRE loop)
Integrate Grafana: import dashboards for latency, error rate, pod CPU/memory.

Alerting: configure Alertmanager -> Slack and PagerDuty.

SLO dashboard: compute availability and latency SLOs from Prometheus queries (use Grafana or sloth/nobl9).

CI/CD: Add a GitHub Actions workflow to build/push image and kubectl apply on merge to main.

Chaos testing: use kubectl to kill pods, or use Litmus/Chaos Mesh to simulate failures and test runbooks.

Postmortems: simulate an incident, perform blameless postmortem (use provided template).

## CI/CD
🔐 Secrets Required in GitHub
You’ll need to set these under Repo → Settings → Secrets and Variables → Actions:

DOCKER_USERNAME → Your Docker Hub username

DOCKER_PASSWORD → Your Docker Hub token/password

KUBECONFIG_FILE → Base64 or raw kubeconfig file for your cluster

📦 How It Works
On push to main, the workflow:

Builds the Docker image from your repo

Pushes it to Docker Hub

Deploy job updates the Kubernetes deployment image

Waits for the rollout to complete

