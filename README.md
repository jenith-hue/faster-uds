# Faster UI Core

Faster UI Core is a React + TypeScript component library focused on dependable, accessible primitives that can be reused across products and design systems.

Current component set:
- Button
- Input
- Dialog

## Project Goals

- Provide small, composable UI primitives with predictable behavior.
- Keep styling token-driven and easy to theme.
- Ship production-ready package artifacts for ESM, CJS, CSS, and TypeScript declarations.
- Maintain quality with linting, unit tests, browser tests, and Storybook documentation.

## Tech Stack

- React 19
- TypeScript 6
- Vite 8 (library build)
- Storybook 10 (docs + interactive component development)
- Jest + React Testing Library (unit and behavior tests)
- Cypress (end-to-end browser tests)
- ESLint (TypeScript + React + Storybook rules)

## Package Outputs

Build artifacts generated in dist:

- dist/faster.js (ES module bundle)
- dist/faster.cjs (CommonJS bundle)
- dist/library.css (component styles + tokens imports)
- dist/index.d.ts and component declaration files

Public package exports:

- Root export for components and types
- library.css export for styling import in consuming apps

Peer dependencies:

- react >= 18
- react-dom >= 18

## Installation

Install from npm:

```bash
npm install faster-ui-core
```

If published under a scope, use that scoped package name instead.

## Consumer Usage

```tsx
import { Button, Input, Dialog } from "faster-ui-core";
import "faster-ui-core/library.css";

export function Example() {
	return (
		<>
			<Input label="Email" placeholder="you@example.com" />
			<Button>Save</Button>
			<Dialog open={false} onOpenChange={() => undefined} title="Example">
				Dialog content
			</Dialog>
		</>
	);
}
```

## Component API Summary

Button:
- category: normal | danger
- variant: primary | outline | ghost | link
- size: small | medium | large
- supports loading, fullWidth, icon placement, and icon-only mode

Input:
- size: small | medium | large
- type: native input types plus currency
- supports label, helper text, error text, icon/prefix/suffix, clear action
- clear button behavior keeps layout stable when toggling visibility

Dialog:
- controlled open state via open and onOpenChange
- size: small | medium | large
- optional title, close button, footer, and divider
- supports Escape/backdrop close and focus restoration

## Styling and Design Tokens

Library styles are imported from library.css, which imports token files:

- src/tokens/_colors.css
- src/tokens/_spacing.css
- src/tokens/_typography.css

Tokens use namespaced CSS variables with Faster prefixes so consuming apps can override values without editing component code.

## Repository Structure

- src/components: Component source code, stories, and tests
- src/tokens: Design token CSS files
- src/const: Shared constants used across components
- .storybook: Storybook configuration
- cypress: End-to-end tests and screenshots
- dist: Build output (generated)
- storybook-static: Static Storybook build output (generated)

## Development Setup

Prerequisites:
- Node.js 22 or newer recommended
- npm

Install dependencies:

```bash
npm install
```

Start local demo app:

```bash
npm run dev
```

Start Storybook:

```bash
npm run storybook
```

## Scripts

- npm run dev: Start Vite dev server
- npm run build: Type-check project references, bundle library, emit declarations
- npm run lint: Run ESLint
- npm test: Run Jest test suite
- npm run test:watch: Run Jest in watch mode
- npm run test:e2e: Run Cypress end-to-end suite
- npm run storybook: Start Storybook at port 6006
- npm run build-storybook: Create static Storybook output

Prepublish guard:

- prepublishOnly runs lint, tests, and build before publish

## Testing Strategy

Unit and component behavior:
- Jest + React Testing Library
- Covers rendering, accessibility attributes, variant behavior, interaction logic

Browser end-to-end:
- Cypress runs against base URL from CYPRESS_BASE_URL or defaults to http://localhost:5173
- Spec files live under cypress/e2e

Storybook quality checks:
- Docs and interactive states for each component
- Accessibility checks enabled in preview parameters

## Accessibility Notes

- Button supports disabled/loading semantics and icon-only label requirements.
- Input wires label, error/helper messaging, and aria-describedby correctly.
- Dialog uses role=dialog, aria-modal, Escape handling, backdrop close, and focus restore.

## Build and Type Generation Details

- Vite library mode outputs ESM and CJS bundles.
- CSS is emitted as library.css via configured asset naming.
- TypeScript declaration files are emitted with tsconfig.types.json.
- React and React DOM are externalized in bundle output.

## CI and Release Workflow

GitHub Actions workflow in .github/workflows/publish.yml:

- Trigger: push tag matching v*
- Steps: checkout, setup node, npm ci, lint, test, build, npm publish --access public
- Permissions include id-token for trusted publishing setups

Recommended release flow:

```bash
npm version patch
git push origin main --follow-tags
```

Then the publish workflow runs automatically on the pushed tag.

## Troubleshooting

Cypress base URL mismatch:

```bash
CYPRESS_BASE_URL=http://localhost:5174 npm run test:e2e
```

Type updates not visible in consumer app editor:

- Reinstall or relink updated package version.
- Restart TypeScript server in VS Code.

## License

MIT
