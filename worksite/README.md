# VerbaEdge Ops — Operations Website

Private source-code website starter for **VerbaEdge Systems LLC**. Built as a zero-dependency static web project with a Node development server, functional UI features and a Cloudflare Pages-compatible build.

```bash
node --version           # Node 20+
npm run dev              # http://localhost:3000
npm test
npm run build            # emits dist/
```

Cloudflare Pages: connect a PRIVATE GitHub repository, production branch `main`, build command `npm run build`, output directory `dist`, build root repository root. Default project subdomain `*.pages.dev`. Attach domain only after review.

There is no backend or secret management in this demo. Work-order and shipment workflows in /demo/ are fictional localStorage examples. Map pins represent approximate geographic locations, not physical routes or live events.

See `WORK_PROJECT_INSTRUCTIONS.md`, `WORK_FIRST_TASK.md`, `CODEX_FIRST_TASK.md`, `docs/LEGAL_RELEASE_GATES.md`, `docs/IMAGE_RIGHTS_AND_DESIGN.md` and `AGENTS.md`.
