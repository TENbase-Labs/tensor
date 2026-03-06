# TENsor

Multi-brand design system for TENbase Labs products. Shared foundations with per-project themes.

[![npm version](https://img.shields.io/npm/v/@tenbaselabs/tensor)](https://www.npmjs.com/package/@tenbaselabs/tensor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Multi-brand theming** — PlusOne, HooverSheet, and more with runtime switching
🎨 **Design tokens** — Consistent colors, typography, spacing, and motion
⚛️ **React 19** — Built for the latest React with full TypeScript support
🎯 **Accessibility** — WCAG 2.1 AA compliant with keyboard and screen reader support
📦 **Monorepo** — Core tokens, React components, and themes in one place
🛠️ **Developer experience** — Storybook 10, Vite, Tailwind CSS v4

## Quick Start

### Installation

```bash
npm install @tenbaselabs/tensor-react @tenbaselabs/tensor
```

### Basic Usage

```tsx
import { Button, Card } from '@tenbaselabs/tensor-react';
import { plusone } from '@tenbaselabs/tensor-themes/plusone';

// Apply theme
document.documentElement.classList.add(plusone);

function App() {
  return (
    <Card>
      <h1>Welcome to TENsor</h1>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## Packages

| Package | Description | Version |
|---|---|---|
| [`@tenbaselabs/tensor`](packages/tensor) | Core design tokens and utilities | ![npm](https://img.shields.io/npm/v/@tenbaselabs/tensor) |
| [`@tenbaselabs/tensor-react`](packages/tensor-react) | React components | ![npm](https://img.shields.io/npm/v/@tenbaselabs/tensor-react) |
| [`@tenbaselabs/tensor-themes`](packages/tensor-themes) | Brand-specific themes | ![npm](https://img.shields.io/npm/v/@tenbaselabs/tensor-themes) |

## Documentation

📚 **[Full Documentation](src/docs/)** — Comprehensive guides and API reference

### Getting Started

- **[Installation](src/docs/01-getting-started/Installation.mdx)** — Setup guide
- **[Quick Start](src/docs/01-getting-started/QuickStart.mdx)** — Build your first component

### Core Concepts

- **[Design Tokens](src/docs/02-design-tokens/Overview.mdx)** — Colors, typography, spacing, motion
- **[Components](src/docs/03-components/ComponentTemplate.mdx)** — React component library
- **[Themes](src/docs/04-themes/Overview.mdx)** — Multi-brand theming system
- **[Accessibility](src/docs/05-accessibility/Overview.mdx)** — WCAG compliance and best practices

### Guides

- **[Migration Guide](src/docs/06-migration/MigrationGuide.mdx)** — Upgrading between versions
- **[Contributing](CONTRIBUTING.md)** — How to contribute to TENsor

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

```bash
# Clone repository
git clone https://github.com/TENbase-Labs/tensor.git
cd tensor

# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build packages
npm run build
```

### Project Structure

```
tensor/
├── packages/
│   ├── tensor/              # Core tokens
│   ├── tensor-react/        # React components
│   └── tensor-themes/       # Brand themes
├── src/
│   ├── docs/                # Documentation (MDX)
│   └── stories/             # Storybook stories
└── .storybook/              # Storybook config
```

## Scripts

```bash
npm run dev              # Start Vite dev server
npm run storybook        # Start Storybook
npm run build            # Build all packages
npm run build-storybook  # Build Storybook for deployment
npm test                 # Run tests
npm run lint             # Lint codebase
npm run typecheck        # TypeScript type checking
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write tests
5. Commit using conventional commits (`git commit -m 'feat(button): add loading state'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © TENbase Labs

## Community

- **GitHub Issues:** [Report bugs or request features](https://github.com/TENbase-Labs/tensor/issues)
- **GitHub Discussions:** [Ask questions, share ideas](https://github.com/TENbase-Labs/tensor/discussions)
- **NPM:** [@tenbaselabs/tensor](https://www.npmjs.com/package/@tenbaselabs/tensor)

## Credits

Built with:

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Storybook 10](https://storybook.js.org/)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)

---

Made with ❤️ by [TENbase Labs](https://tenbaselabs.com)
