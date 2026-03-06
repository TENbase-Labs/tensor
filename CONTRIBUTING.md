# Contributing to TENsor

Thank you for your interest in contributing to TENsor! This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and collaborative. We're building software together.

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/tensor.git
cd tensor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Environment

```bash
# Start Storybook
npm run storybook

# Run tests
npm test

# Type checking
npm run typecheck
```

## Project Structure

```
tensor/
├── packages/
│   ├── tensor/              # Core tokens and utilities
│   ├── tensor-react/        # React components
│   └── tensor-themes/       # Brand themes
├── src/
│   ├── docs/                # Documentation (MDX)
│   └── stories/             # Storybook stories
├── .storybook/              # Storybook config
└── package.json
```

## Contributing Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation updates
- `chore/` — Maintenance tasks

### 2. Make Changes

Follow these guidelines:

#### Code Style

- **TypeScript:** All new code must be TypeScript
- **Formatting:** Run `npm run format` before committing
- **Linting:** Fix all `npm run lint` errors

#### Component Guidelines

- Use design tokens, not hard-coded values
- Include TypeScript prop types
- Add accessibility attributes (ARIA, keyboard support)
- Write tests for all interactive behavior
- Document in Storybook with examples

**Example component:**

```tsx
import { tokens } from '@tenbaselabs/tensor';
import type { ReactNode } from 'react';

export interface ButtonProps {
  /** Button text */
  children: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: tokens.colors[variant],
        padding: tokens.spacing.md,
      }}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}
```

#### Documentation Guidelines

- Follow the [Component Documentation Template](src/docs/03-components/ComponentTemplate.mdx)
- Provide "When to Use" and "When Not to Use" guidance
- Include Do's and Don'ts with code examples
- Document accessibility requirements
- Show real, working code examples

### 3. Write Tests

All components require:

- **Unit tests** (behavior testing)
- **Accessibility tests** (axe-core)
- **Visual regression tests** (Storybook)

```tsx
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from './Button';

test('Button calls onClick when clicked', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);

  fireEvent.click(getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('Button is accessible', async () => {
  const { container } = render(<Button>Click</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 4. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test Button.test.tsx

# Type checking
npm run typecheck

# Linting
npm run lint
```

### 5. Create Storybook Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};
```

### 6. Update Documentation

- Add component docs to `src/docs/03-components/YourComponent.mdx`
- Update relevant guides if introducing new concepts
- Include migration notes for breaking changes

### 7. Commit Changes

Use conventional commit messages:

```bash
# Format: <type>(<scope>): <description>

git commit -m "feat(button): add loading state prop"
git commit -m "fix(modal): correct focus trap behavior"
git commit -m "docs(tokens): update color contrast examples"
```

**Commit types:**
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation update
- `style:` — Code formatting (no logic changes)
- `refactor:` — Code restructuring (no behavior changes)
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

### 8. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## Pull Request Guidelines

### PR Title

Use conventional commit format:

```
feat(button): add loading state
fix(modal): correct focus restoration
docs(accessibility): add ARIA pattern examples
```

### PR Description

Include:

1. **What changed:** Brief summary of changes
2. **Why:** Reason for the change (link to issue if applicable)
3. **Screenshots:** For UI changes
4. **Testing:** How you tested the changes
5. **Checklist:**

```markdown
- [ ] Tests pass (`npm test`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No linting errors (`npm run lint`)
- [ ] Documentation updated
- [ ] Storybook stories added/updated
- [ ] Accessibility tested (keyboard + screen reader)
- [ ] Reviewed my own code
```

### Required CI Checks

All pull requests must pass the following automated checks before merging:

#### ✅ Test Suite (`Run Tests`)

- **What it checks:** All unit tests, integration tests, and coverage thresholds
- **Required coverage:** 80% minimum across all packages
- **Workflow:** `.github/workflows/test.yml`

**If this fails:**
- Review test failures in the GitHub Actions log
- Run `npm test` locally to reproduce
- Fix failing tests or update tests if behavior changed intentionally
- Ensure new code has adequate test coverage

#### ✅ Visual Regression (`visual-regression`)

- **What it checks:** Storybook visual regression tests via Argos CI
- **Workflow:** `.github/workflows/argos.yml`

**If this fails:**
- Review visual diffs in the Argos dashboard (linked in PR comments)
- If changes are intentional, approve them in Argos
- If changes are unintentional, fix the UI regression

#### 📋 Merge Settings

- **Merge strategy:** Squash merge only (standardizes commit history)
- **Auto-delete:** Head branches are automatically deleted after merge
- **Linear history:** No merge commits allowed

### Coverage Requirements

The test suite enforces an **80% coverage threshold** for:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

Contributions that drop coverage below 80% will fail CI. Ensure your code is adequately tested:

```bash
# Check coverage locally
npm test -- --coverage

# View detailed coverage report
open coverage/index.html
```

### Handling Failed Checks

1. **Read the error message** in the GitHub Actions workflow log
2. **Reproduce locally** using the same commands (npm test, npm run build, etc.)
3. **Fix the issue** and push additional commits
4. **Re-run checks** (they trigger automatically on new pushes)

Do not bypass or skip checks. If you believe a check is incorrectly failing, comment on the PR for maintainer assistance.

### Review Process

1. **Automated checks** run (tests, visual regression, coverage)
2. **All checks must pass** (see Required CI Checks above)
3. **Maintainer review** (may request changes)
4. **At least 1 approval** required
5. **Squash and merge** to main

## Design Token Contributions

When adding or modifying tokens:

1. **Propose change** via GitHub issue first
2. **Ensure consistency** with existing token system
3. **Validate accessibility** (color contrast, sizing)
4. **Document usage** in token docs
5. **Update all themes** to include new token

## Theme Contributions

When adding a new theme:

1. **Get brand approval** (ensure you have permission to use brand assets)
2. **Follow theme structure** (see [Creating Themes](src/docs/04-themes/CreatingThemes.mdx))
3. **Validate contrast ratios** (WCAG AA minimum)
4. **Provide both light and dark variants**
5. **Add to Storybook** theme switcher
6. **Document theme** in dedicated guide

## Reporting Issues

### Bug Reports

Include:

- **Description:** What went wrong
- **Steps to reproduce:** Minimal reproduction steps
- **Expected behavior:** What should happen
- **Actual behavior:** What actually happens
- **Environment:** Browser, OS, TENsor version
- **Screenshots/video:** If applicable

### Feature Requests

Include:

- **Use case:** Why is this needed
- **Proposed solution:** How it should work
- **Alternatives considered:** Other approaches
- **Examples:** Similar features in other systems

## Community

- **GitHub Discussions:** Ask questions, share ideas
- **GitHub Issues:** Report bugs, request features
- **Discord:** Real-time chat (coming soon)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Open a [GitHub Discussion](https://github.com/TENbase-Labs/tensor/discussions) or reach out to the maintainers.

Thank you for contributing to TENsor! 🎉
