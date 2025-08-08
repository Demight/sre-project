# 📄 Postmortem Report: Latency Incident - August 2025

**Date of Incident**: August 5, 2025  
**Duration**: 16 minutes  
**Severity**: Medium  
**Detected By**: Prometheus alert (HighLatency)

---

## 🔍 Summary
At 14:22 UTC, the average response latency exceeded 500ms for 10 minutes, violating our defined SLO of 95% of requests < 300ms. Alert triggered and notified via Slack webhook.

---

## 🧨 Impact
- 20% of user requests during this period experienced degraded performance.
- No data loss or service outage occurred.

---

## 🧾 Root Cause
An autoscaler misconfiguration prevented the application pods from scaling up during a sudden traffic spike.

---

## 🔧 Resolution
- Manually scaled the deployment to 5 replicas.
- Resolved the issue in 16 minutes.

---

## ✅ Action Items
- [x] Fix HPA CPU threshold misconfiguration
- [ ] Add load testing scenarios to staging pipeline
- [ ] Update latency Grafana dashboard to include 99th percentile view

---

## 💡 Lessons Learned
- Better HPA observability could have caught this preemptively.
- Alerts based on SLOs helped detect the issue before major customer complaints.
