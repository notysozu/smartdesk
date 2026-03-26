# Contributing

Thanks for helping improve SmartDesk.

## Development Setup

1. Install Node.js 20+ and MongoDB.
2. Clone the repository:

```bash
git clone https://github.com/notysozu/smartdesk.git
cd smartdesk
```

3. Create environment files:

```bash
cp .env.example .env
cp client/.env.example client/.env.local
```

4. Install dependencies:

```bash
npm install
cd client && npm install && cd ..
```

5. Start the app in separate terminals:

```bash
npm run dev
cd client && npm run dev
```

## Coding Standards

- Prefer small, focused pull requests.
- Preserve the existing CommonJS backend and Next.js frontend conventions unless a refactor is intentional.
- Add concise comments only when the code would otherwise be hard to follow.
- Keep environment-specific values out of source control.

## Testing

- Run backend tests with `npm test`.
- Run the frontend production build with `cd client && npm run build`.
- If you change API or auth behavior, include or update tests when practical.

## Commit Conventions

Use Conventional Commits:

- `feat:`
- `fix:`
- `docs:`
- `chore:`
- `refactor:`
- `test:`

Examples:

- `docs: improve installation guide`
- `fix: handle missing auth cookie`
- `test: add health endpoint coverage`

## Pull Request Process

1. Rebase or merge from the latest `main`.
2. Keep PR descriptions clear about user-facing impact and testing performed.
3. Link related issues when available.
4. Make sure secrets, local env files, and generated build artifacts are not included.
