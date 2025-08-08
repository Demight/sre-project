const express = require('express');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const register = client.register;
client.collectDefaultMetrics({ timeout: 10000 });

// Define a histogram for request durations
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

// A counter for request counts
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

// Simulate variable latency to exercise SLOs/alerts
function randomDelay() {
  // Normal latency most of time, occasional slow responses
  const r = Math.random();
  if (r < 0.02) return 1000;      // 2% slow (1s)
  if (r < 0.1) return 300;        // 8% medium (300ms)
  return Math.random() * 150;     // rest fast (<150ms)
}

// Instrumentation wrapper
function observe(req, res, next) {
  const end = httpRequestDuration.startTimer();
  const route = req.route ? req.route.path : req.path;
  res.on('finish', () => {
    end({ method: req.method, route: route, code: res.statusCode });
    httpRequestsTotal.inc({ method: req.method, route: route, code: res.statusCode });
  });
  next();
}

// Routes
app.get('/', (req, res) => {
  const delay = randomDelay();
  setTimeout(() => {
    res.json({ message: 'Hello from SRE demo app', delayMs: delay });
  }, delay);
});

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Use instrumentation for relevant routes
app.use(observe);

// Start
app.listen(port, () => {
  console.log(`sre-demo-app listening on port ${port}`);
});
