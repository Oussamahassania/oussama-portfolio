# Oussama Hassania — Portfolio

A frontend-only Next.js portfolio for Oussama Hassania, deployed as a static site to GitHub Pages.

## Local development

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```powershell
npm run build
```

The static export is written to `out/`.

## GitHub Pages deployment

The repository uses `.github/workflows/deploy-pages.yml`. Pushing to `main` builds the static export and deploys it to GitHub Pages at:

```text
https://oussamahassania.github.io/oussama-portfolio/
```

`NEXT_PUBLIC_BASE_PATH=/oussama-portfolio` is set during the Pages build so routes, assets and the resume download resolve under the project sub-path.

## Content editing

All portfolio content is centralized in `src/data/`:

- `profile.ts` — identity, contacts and about copy
- `navigation.ts` — navigation items
- `skills.ts` — skill categories
- `projects.ts` — projects, architecture and links
- `certifications.ts` — verified credentials
- `security.ts` — cybersecurity achievements
- `journey.ts` — education and internship timeline
