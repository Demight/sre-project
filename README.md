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

