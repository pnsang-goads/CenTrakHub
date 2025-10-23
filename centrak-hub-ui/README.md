# centrak-hub-ui

This repository contains the React UI for centrak-hub. We keep a single frontend app:

- `centrak-hub-ui-base` (Create React App + TypeScript, MUI)

## Dev

1) Backend API (Laravel)
- From repo root: `cd centrak-hub && php artisan serve` → http://localhost:8000

2) Frontend
- From repo root: `cd centrak-hub-ui/centrak-hub-ui-base`
- Install deps: `yarn` (or `npm i`)
- Start dev: `yarn start` (or `npm start`) → http://localhost:3000
- Dev proxy to API is preconfigured in `package.json` (`proxy: http://localhost:8000`).

## Build for Laravel

- From `centrak-hub-ui/centrak-hub-ui-base` run: `yarn build:php`
- This builds the React app and copies to `centrak-hub/public/app`
- Access integrated UI at http://localhost:8000/app

Tip: You can also use helper scripts from the repo root:
- `./start-dev.ps1` to run API + React together
- `./build-and-serve.ps1` to build UI and serve with Laravel
