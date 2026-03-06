#!/usr/bin/env node

/**
 * Component Generator CLI
 * Creates new TENsor components with consistent structure and boilerplate
 *
 * Usage: npm run create-component ComponentName
 * or: node scripts/create-component.js ComponentName
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const componentName = process.argv[2]

if (!componentName) {
  console.error('❌ Error: Component name is required')
  console.log('Usage: npm run create-component ComponentName')
  process.exit(1)
}

// Validate component name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Error: Component name must be in PascalCase (e.g., Button, TextField)')
  process.exit(1)
}

const componentDir = join(
  __dirname,
  '..',
  'packages',
  'tensor-react',
  'src',
  'components',
  componentName,
)

// Check if component already exists
if (existsSync(componentDir)) {
  console.error(`❌ Error: Component "${componentName}" already exists at ${componentDir}`)
  process.exit(1)
}

// Create component directory
mkdirSync(componentDir, { recursive: true })

// Component file template
const componentTemplate = `import React from 'react';
import { tokens } from '@tenbaselabs/tensor';
import './${componentName}.css';

export interface ${componentName}Props {
  /**
   * The content of the ${componentName}
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Accessible label for screen readers
   */
  'aria-label'?: string;
}

/**
 * ${componentName} component
 *
 * @example
 * <${componentName}>
 *   Content goes here
 * </${componentName}>
 */
export const ${componentName} = React.forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`tensor-${componentName.toLowerCase()} \${className || ''}\`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

${componentName}.displayName = '${componentName}';
`

// CSS file template
const cssTemplate = `.tensor-${componentName.toLowerCase()} {
  /* Base styles using design tokens */
  font-size: var(--typography-fontSize-base);
  color: var(--colors-text-primary);

  /* Add component-specific styles here */
}

/* Variants */
.tensor-${componentName.toLowerCase()}--primary {
  background-color: var(--colors-primary);
  color: var(--colors-text-inverse);
}

/* States */
.tensor-${componentName.toLowerCase()}:hover {
  /* Hover styles */
}

.tensor-${componentName.toLowerCase()}:focus-visible {
  outline: 2px solid var(--colors-primary);
  outline-offset: 2px;
}

.tensor-${componentName.toLowerCase()}:disabled {
  color: var(--colors-text-disabled);
  cursor: not-allowed;
}

/* Responsive */
@media (min-width: 768px) {
  .tensor-${componentName.toLowerCase()} {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .tensor-${componentName.toLowerCase()} {
    /* Desktop styles */
  }
}
`

// Test file template
const testTemplate = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders children correctly', () => {
    render(<${componentName}>Test Content</${componentName}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<${componentName} className="custom-class">Content</${componentName}>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('tensor-${componentName.toLowerCase()}');
    expect(element).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<${componentName} ref={ref}>Content</${componentName}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through aria-label', () => {
    render(<${componentName} aria-label="Test Label">Content</${componentName}>);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });
});
`

// Storybook story template
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${componentName} component description goes here.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the ${componentName}',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    children: 'Default ${componentName}',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Class ${componentName}',
    className: 'custom-styling',
  },
};

export const Accessible: Story = {
  args: {
    children: '${componentName} with ARIA label',
    'aria-label': 'Accessible ${componentName}',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: true,
          },
        ],
      },
    },
  },
};
`

// Index file template
const indexTemplate = `export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
`

// Write all files
try {
  writeFileSync(join(componentDir, `${componentName}.tsx`), componentTemplate)
  writeFileSync(join(componentDir, `${componentName}.css`), cssTemplate)
  writeFileSync(join(componentDir, `${componentName}.test.tsx`), testTemplate)
  writeFileSync(join(componentDir, `${componentName}.stories.tsx`), storyTemplate)
  writeFileSync(join(componentDir, 'index.ts'), indexTemplate)

  console.log(`✅ Component "${componentName}" created successfully!`)
  console.log(`\n📁 Files created:`)
  console.log(`   ${componentDir}/${componentName}.tsx`)
  console.log(`   ${componentDir}/${componentName}.css`)
  console.log(`   ${componentDir}/${componentName}.test.tsx`)
  console.log(`   ${componentDir}/${componentName}.stories.tsx`)
  console.log(`   ${componentDir}/index.ts`)
  console.log(`\n📝 Next steps:`)
  console.log(`   1. Implement component logic in ${componentName}.tsx`)
  console.log(`   2. Add styles in ${componentName}.css`)
  console.log(`   3. Write tests in ${componentName}.test.tsx`)
  console.log(`   4. Document in ${componentName}.stories.tsx`)
  console.log(`   5. Export from packages/tensor-react/src/index.ts`)
  console.log(`\n🎨 View in Storybook:`)
  console.log(`   npm run storybook`)
} catch (error) {
  console.error('❌ Error creating component:', error.message)
  process.exit(1)
}
