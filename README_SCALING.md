# UI Scaling

How I would scale the UI from **5 RPS → 50 RPS → 500 RPS**.

## 5 RPS

* Docker setup for local development.
* Branch flow: `feature/*` / `bugfix/*` → `release/1.0` → `main`.
* PR review before merging to release.
* React/Vite with basic logging and error handling.
* Keep bundle size small.
* Jenkins/CI for build, unit tests and Sonar checks.
* No caching/CDN needed at this stage.

## 50 RPS

* Automate release promotion and PR creation.
* Jenkins: build, tests, ESLint/TSLint, Sonar and vulnerability checks.
* Use Redux Toolkit / RTK Query for API response caching.
* Add debouncing for search/filter requests.
* Add pagination for larger datasets.
* Code splitting/lazy loading for larger modules.
* Add static asset caching.
* Create a common npm package for shared UI code.
* Changes to the common package require team review/approval before publishing.
* Add frontend error and API monitoring using Splunk.

## 500 RPS

* Serve static assets through a CDN.
* Use multiple origin/web server instances if required.
* Continue using caching and RTK Query to reduce API calls.
* Further optimize bundles and assets.
* Use Dynatrace for frontend performance, errors and API tracing.
* Add correlation IDs to trace UI requests through the backend.
* Keep strict branch/PR rules and Jira-based changes.
* Common npm packages should be versioned and changes reviewed before publishing.
* Jenkins pipeline should include tests, linting, Sonar and vulnerability checks.

## Load Testing

Monitor:

* Page/API response time
* Error rate
* Bundle size
* CDN/cache hit rate

The main goal is to **reduce unnecessary API calls and move static asset traffic to the CDN as traffic grows**.
