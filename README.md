# SmartDesk

> A full-stack university management platform with role-based workflows, operational dashboards, and feedback analytics.

[![CI](https://github.com/notysozu/smartdesk/actions/workflows/ci.yml/badge.svg)](https://github.com/notysozu/smartdesk/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

SmartDesk brings student services, academic administration, campus operations, and analytics into one system. It combines an Express + MongoDB backend with a Next.js frontend to support dashboards, announcements, attendance, finance, library workflows, hostel management, and AI-assisted insight generation.

## Overview

Universities often manage academic data, student services, and administrative workflows across disconnected tools. SmartDesk aims to centralize those workflows in a single platform so institutions can:

- manage multiple roles from one application
- reduce operational friction across departments
- surface actionable insights from student feedback and reporting data
- provide a unified experience for students, faculty, and admins

## Features

- Multi-role access for admins, academic managers, faculty, students, librarians, and other campus staff
- Unified student dashboard for courses, attendance, fees, library activity, events, and announcements
- Admin modules for users, topics, configuration, finance, hostel, infrastructure, and academic workflows
- AI-assisted insights powered by local Ollama integration for feedback summarization
- Role-based authentication with JWT, secure cookies, rate limiting, and security headers
- Seeded demo users for local evaluation and onboarding

## Demo / Preview

- Live frontend: https://client-tau-lemon.vercel.app
- Screenshots: add dashboard screenshots here
- GIF walkthroughs: add short admin/student workflow demos here

## Installation

### Requirements

| Requirement | Version / Notes |
| --- | --- |
| Node.js | 20+ |
| npm | bundled with Node.js |
| MongoDB | local or cloud instance |
| Ollama | optional, only needed for local AI summary features |

### One-command installers

Review remote scripts before using pipe-to-shell installers in production or shared environments.

Linux / macOS:

```bash
curl -fsSL https://raw.githubusercontent.com/notysozu/smartdesk/main/install.sh | bash
```

Linux / macOS with `wget`:

```bash
wget -qO- https://raw.githubusercontent.com/notysozu/smartdesk/main/install.sh | bash
```

Windows PowerShell:

```powershell
iwr https://raw.githubusercontent.com/notysozu/smartdesk/main/install.ps1 -UseBasicParsing | iex
```

Useful installer options:

- `START_APP=0` skips launching the app after install
- `SEED_DB=1` seeds demo users after dependencies are installed
- `INSTALL_DIR=/custom/path` clones the repo into a custom location

Example:

```bash
curl -fsSL https://raw.githubusercontent.com/notysozu/smartdesk/main/install.sh | START_APP=0 SEED_DB=1 bash
```

### Manual setup

1. Clone the repository:

```bash
git clone https://github.com/notysozu/smartdesk.git
cd smartdesk
```

2. Create environment files:

```bash
cp .env.example .env
cp client/.env.example client/.env.local
```

3. Install backend and frontend dependencies:

```bash
npm install
cd client && npm install && cd ..
```

4. Start the backend and frontend in separate terminals:

```bash
npm run dev
cd client && npm run dev
```

5. Open the app at `http://localhost:3000`.

### Environment setup

Backend variables live in [`.env.example`](./.env.example). Frontend variables live in [`client/.env.example`](./client/.env.example).

Typical local values:

```env
MONGO_URI=mongodb://localhost:27017/smartdesk
JWT_SECRET=change-this-secret
CLIENT_ORIGIN=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Usage

### Local development

Backend:

```bash
npm run dev
```

Frontend:

```bash
cd client && npm run dev
```

### Seed demo data

```bash
npm run seed
```

Default users after seeding:

| Role | Username | Password |
| --- | --- | --- |
| Admin | `admin` | `admin123` |
| Student | `student` | `student123` |
| Librarian | `librarian` | `lib123` |
| Hostel Manager | `hostel_manager` | `hostel123` |
| Finance Manager | `finance_manager` | `finance123` |
| Academic Manager | `academic_manager` | `academic123` |
| Faculty | `faculty` | `faculty123` |

### Test and build

Run backend tests:

```bash
npm test
```

Build the frontend:

```bash
cd client && npm run build
```

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth & Security | JWT, cookies, Helmet, express-rate-limit |
| AI | Ollama |
| Tooling | npm, Nodemon, GitHub Actions |

## Project Structure

```text
smartdesk/
├── api/                  # Vercel serverless entrypoint
├── client/               # Next.js frontend
│   ├── components/       # Reusable UI pieces
│   ├── lib/              # Frontend API utilities
│   ├── pages/            # Route-based pages
│   └── styles/           # Global styles and theme
├── server/               # Express backend
│   ├── ai/               # AI helpers and Ollama integration
│   ├── controllers/      # Request handlers
│   ├── data/             # DB connection and seed logic
│   ├── middleware/       # Auth, security, validation
│   ├── models/           # Mongoose models
│   └── routes/           # API route definitions
├── tests/                # Backend test coverage
├── install.sh            # Bash installer
├── install.ps1           # PowerShell installer
└── package.json
```

## Status

SmartDesk is actively functional and deployable. Core authentication, admin workflows, student-facing views, seeded demo data, CI, and Vercel deployment are already in place.

Current focus areas:

- expanding automated test coverage beyond health/config helpers
- improving frontend lint compatibility with the current Next.js setup
- adding richer screenshots, walkthroughs, and contributor templates

## Contributing

Contributions are welcome. For local setup, coding standards, testing expectations, and pull request conventions, see [CONTRIBUTING.md](./CONTRIBUTING.md).

Community expectations are documented in [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Security

Please report vulnerabilities privately according to [SECURITY.md](./SECURITY.md).

## Additional Docs

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [License](./LICENSE)

## License

Licensed under the [MIT License](./LICENSE).
