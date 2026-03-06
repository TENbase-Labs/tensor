# Adding Stories to Tensor Design System

This guide explains how to add new component stories to the Tensor design system Storybook.

## Quick Start

### 1. Create a Component

Create your component in the appropriate package:

```typescript
// packages/tensor-react/src/Button/Button.tsx
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 2. Create a Story File

Create a `.stories.ts` or `.stories.tsx` file alongside your component:

```typescript
// src/stories/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};
```

### 3. Test Your Story

Run Storybook locally:

```bash
npm run storybook
```

Your story will be available at `http://localhost:6006`.

## Multi-Theme Support

The Tensor design system supports multiple themes (RoundVision and TENbase). To test your component with different themes:

1. Add theme decorator in your story:

```typescript
import { tenbase, roundvision } from '@tenbaselabs/tensor-themes';

export const WithTheme: Story = {
  args: {
    variant: 'primary',
    children: 'Themed Button',
  },
  decorators: [
    (Story) => (
      <div className={tenbase.className}>
        <Story />
      </div>
    ),
  ],
};
```

2. Or configure global theme switching in `.storybook/preview.ts`.

## Visual Regression Testing

All stories are automatically tested for visual regressions using Argos CI:

- **On PR**: Argos will compare your changes against the main branch
- **Comments**: Argos results are posted as PR comments
- **Review**: Review visual changes in the Argos dashboard before merging

### Best Practices

1. **Use descriptive story names**: Name your stories based on the variant or use case
2. **Add controls**: Use argTypes to make your stories interactive
3. **Document props**: Use JSDoc comments on component props for automatic documentation
4. **Test edge cases**: Create stories for different states (loading, error, disabled)
5. **Keep stories simple**: One story should demonstrate one variant or state

## Story Structure

```
src/
  stories/
    ComponentName/
      ComponentName.tsx          # Component implementation
      ComponentName.stories.ts   # Storybook stories
      ComponentName.test.tsx     # Unit tests (optional)
```

## Running Tests

```bash
# Run Storybook
npm run storybook

# Build Storybook for production
npm run build-storybook

# Run Vitest tests
npm run test

# Upload to Argos (requires ARGOS_TOKEN)
npm run argos
```

## Additional Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/)
- [Argos CI Documentation](https://argos-ci.com/docs)
- [Design System Guidelines](./DESIGN_SYSTEM.md)
