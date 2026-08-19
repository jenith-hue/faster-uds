# faster

`faster` is small React UI library for UDS interview exercise. Ships three accessible, composable primitives: `Button`, `Input`, `Dialog`.

## Install

```bash
npm install faster
```

```tsx
import { Button, Input } from 'faster';
import 'faster/styles.css';
export function Example() { return <><Input label="Email" /><Button>Save</Button></>; }
```

## Components

- `Button`: `primary`, `secondary`, `ghost` variants; native button props.
- `Input`: label, helper/error message, required state, native input props.
- `Dialog`: controlled `open` state, Escape/backdrop dismissal, focus restoration. Compose `DialogHeader`, `DialogBody`, `DialogFooter`.

## Tokens and styling

Tokens live in `src/tokens.css`. Namespaced CSS variables (`--faster-*`) cover colors, spacing, radii, typography, shadows. Override variables in application CSS, or import `faster/tokens.css` separately. Components use CSS variables and Tailwind-compatible project setup; consumers do not need Tailwind configuration.

## Development

```bash
npm run dev
npm run storybook
npm test
npm run test:e2e
npm run build-storybook
npm run build
```

Storybook documents every component variant and runs accessibility checks. Deploy `storybook-static` through GitHub Pages, Chromatic, Netlify, or Vercel.

## Quality strategy

Jest + React Testing Library cover variants, semantics, form interactions, disabled behavior, and dialog dismissal. Cypress covers browser dialog/form flows. `prepublishOnly` lints, tests, builds before npm publication.

## Publish

If `faster` is unavailable on npm, publish under your npm scope. Authenticate with `npm login`, then:

```bash
npm publish --access public
```
