# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server with hot reload (ts-node-dev)
npm run build        # compile TypeScript to dist/
npm start            # run compiled server
npm test             # run all tests
npm run test:watch   # run tests in watch mode
npm run lint         # lint src/**/*.ts
```

Run a single test file:
```bash
npx jest src/__tests__/assets.test.ts
```

## Architecture

Express + TypeScript service. Layers are strictly separated:

```
src/
  types/index.ts          # shared interfaces (LeadGenAsset, Person, API shapes)
  services/assetService.ts  # data access — all DB/external calls live here
  controllers/assetController.ts  # request parsing, response shaping, calls service
  routes/assets.ts        # route definitions, maps HTTP verbs/paths to controllers
  app.ts                  # Express app setup (middleware, routers, error handler)
  server.ts               # process entry point, binds port
  __tests__/              # supertest integration tests, service is mocked
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/assets` | List all lead gen assets |
| GET | `/assets/:id` | Fetch a single asset with all its data |
| POST | `/assets/:id/signup` | Sign up a person for an asset |

All responses are wrapped: `{ data: T }` on success, `{ error: string }` on failure.

## Pending

- `LeadGenAsset` and `Person` types in `src/types/index.ts` are stubs — shapes will be defined in future prompts.
- `src/services/assetService.ts` functions are stubs — data persistence to be implemented once models are defined.
