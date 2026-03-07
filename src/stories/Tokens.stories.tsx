import type { Meta, StoryObj } from '@storybook/react'
import { tokens } from '../../packages/tensor/src/tokens'

const meta: Meta = {
  title: 'Design Tokens/Showcase',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

/**
 * Color Tokens Showcase
 * Visual regression baseline for all color tokens
 */
export const Colors: StoryObj = {
  render: () => (
    <div style={{ fontFamily: tokens.typography.fontFamily.sans }}>
      <h2 style={{ fontSize: tokens.typography.fontSize['2xl'], marginBottom: tokens.spacing.lg }}>
        Color Tokens
      </h2>

      {/* Semantic Colors */}
      <section style={{ marginBottom: tokens.spacing.xl }}>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Semantic Colors
        </h3>
        <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
          {Object.entries({
            primary: tokens.colors.primary,
            secondary: tokens.colors.secondary,
            success: tokens.colors.success,
            warning: tokens.colors.warning,
            danger: tokens.colors.danger,
            info: tokens.colors.info,
          }).map(([name, color]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: color,
                  borderRadius: tokens.borderRadius.md,
                  marginBottom: tokens.spacing.sm,
                }}
              />
              <div
                style={{
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: tokens.typography.fontWeight.medium,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.text.secondary,
                }}
              >
                {color}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neutral Palette */}
      <section style={{ marginBottom: tokens.spacing.xl }}>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Neutral Palette
        </h3>
        <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
          {Object.entries(tokens.colors.neutral).map(([shade, color]) => (
            <div key={shade} style={{ flex: 1, textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: color,
                  borderRadius: tokens.borderRadius.sm,
                  marginBottom: tokens.spacing.xs,
                }}
              />
              <div style={{ fontSize: tokens.typography.fontSize.sm }}>{shade}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Text Colors */}
      <section style={{ marginBottom: tokens.spacing.xl }}>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Text Colors
        </h3>
        <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
          {Object.entries(tokens.colors.text).map(([name, color]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: color,
                  borderRadius: tokens.borderRadius.md,
                  marginBottom: tokens.spacing.sm,
                  border: `1px solid ${tokens.colors.neutral[200]}`,
                }}
              />
              <div style={{ fontSize: tokens.typography.fontSize.sm }}>{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Surface Colors */}
      <section>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Surface Colors
        </h3>
        <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
          {Object.entries(tokens.colors.surface).map(([name, color]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: color,
                  borderRadius: tokens.borderRadius.md,
                  marginBottom: tokens.spacing.sm,
                  border: `1px solid ${tokens.colors.neutral[200]}`,
                }}
              />
              <div style={{ fontSize: tokens.typography.fontSize.sm }}>{name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}

/**
 * Typography Tokens Showcase
 * Visual regression baseline for typography scales
 */
export const Typography: StoryObj = {
  render: () => (
    <div style={{ fontFamily: tokens.typography.fontFamily.sans }}>
      <h2 style={{ fontSize: tokens.typography.fontSize['2xl'], marginBottom: tokens.spacing.lg }}>
        Typography Tokens
      </h2>

      {/* Font Sizes */}
      <section style={{ marginBottom: tokens.spacing.xl }}>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Font Sizes
        </h3>
        {Object.entries(tokens.typography.fontSize).map(([name, size]) => (
          <div key={name} style={{ marginBottom: tokens.spacing.md }}>
            <div
              style={{
                fontSize: size,
                lineHeight: tokens.typography.lineHeight.normal,
              }}
            >
              {name}: The quick brown fox jumps over the lazy dog ({size})
            </div>
          </div>
        ))}
      </section>

      {/* Font Weights */}
      <section style={{ marginBottom: tokens.spacing.xl }}>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Font Weights
        </h3>
        {Object.entries(tokens.typography.fontWeight).map(([name, weight]) => (
          <div key={name} style={{ marginBottom: tokens.spacing.md }}>
            <div
              style={{
                fontSize: tokens.typography.fontSize.base,
                fontWeight: weight,
                lineHeight: tokens.typography.lineHeight.normal,
              }}
            >
              {name} ({weight}): The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </section>

      {/* Line Heights */}
      <section>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Line Heights
        </h3>
        {Object.entries(tokens.typography.lineHeight).map(([name, lineHeight]) => (
          <div key={name} style={{ marginBottom: tokens.spacing.lg }}>
            <div
              style={{
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
              }}
            >
              {name} ({lineHeight})
            </div>
            <div
              style={{
                fontSize: tokens.typography.fontSize.base,
                lineHeight: lineHeight,
                backgroundColor: tokens.colors.surface.sunken,
                padding: tokens.spacing.md,
                borderRadius: tokens.borderRadius.md,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
}

/**
 * Spacing Tokens Showcase
 * Visual regression baseline for spacing scale
 */
export const Spacing: StoryObj = {
  render: () => (
    <div style={{ fontFamily: tokens.typography.fontFamily.sans }}>
      <h2 style={{ fontSize: tokens.typography.fontSize['2xl'], marginBottom: tokens.spacing.lg }}>
        Spacing Tokens
      </h2>

      <section>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Spacing Scale (8px grid)
        </h3>
        {Object.entries(tokens.spacing).map(([name, space]) => (
          <div key={name} style={{ marginBottom: tokens.spacing.lg }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
              <div
                style={{
                  width: '60px',
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: tokens.typography.fontWeight.medium,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  width: space,
                  height: '40px',
                  backgroundColor: tokens.colors.primary,
                  borderRadius: tokens.borderRadius.sm,
                }}
              />
              <div
                style={{
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.text.secondary,
                }}
              >
                {space}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
}

/**
 * Container Tokens Showcase
 * Visual regression baseline for container sizes
 */
export const Containers: StoryObj = {
  render: () => (
    <div style={{ fontFamily: tokens.typography.fontFamily.sans }}>
      <h2 style={{ fontSize: tokens.typography.fontSize['2xl'], marginBottom: tokens.spacing.lg }}>
        Container Tokens
      </h2>

      <section>
        <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
          Responsive Container Sizes
        </h3>
        {Object.entries(tokens.container).map(([name, maxWidth]) => (
          <div key={name} style={{ marginBottom: tokens.spacing.xl }}>
            <div
              style={{ fontSize: tokens.typography.fontSize.sm, marginBottom: tokens.spacing.sm }}
            >
              <span style={{ fontWeight: tokens.typography.fontWeight.medium }}>{name}</span>
              {' — '}
              <span style={{ color: tokens.colors.text.secondary }}>{maxWidth}</span>
            </div>
            <div
              style={{
                maxWidth: maxWidth,
                width: '100%',
                height: '60px',
                backgroundColor: tokens.colors.surface.sunken,
                border: `2px solid ${tokens.colors.primary}`,
                borderRadius: tokens.borderRadius.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
              }}
            >
              Container: {name} ({maxWidth})
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
}

/**
 * Motion Tokens Showcase
 * Visual regression baseline for animation tokens
 */
export const Motion: StoryObj = {
  render: () => {
    const [active, setActive] = React.useState<string | null>(null)

    return (
      <div style={{ fontFamily: tokens.typography.fontFamily.sans }}>
        <h2
          style={{ fontSize: tokens.typography.fontSize['2xl'], marginBottom: tokens.spacing.lg }}
        >
          Motion Tokens
        </h2>

        {/* Duration */}
        <section style={{ marginBottom: tokens.spacing.xl }}>
          <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
            Animation Duration
          </h3>
          {Object.entries(tokens.motion.duration).map(([name, duration]) => (
            <div key={name} style={{ marginBottom: tokens.spacing.lg }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                <div style={{ width: '100px', fontSize: tokens.typography.fontSize.sm }}>
                  <span style={{ fontWeight: tokens.typography.fontWeight.medium }}>{name}</span>{' '}
                  <span style={{ color: tokens.colors.text.secondary }}>({duration})</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActive(name)
                    setTimeout(() => setActive(null), parseInt(duration, 10))
                  }}
                  style={{
                    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                    backgroundColor: tokens.colors.primary,
                    color: tokens.colors.text.inverse,
                    border: 'none',
                    borderRadius: tokens.borderRadius.md,
                    cursor: 'pointer',
                    fontSize: tokens.typography.fontSize.sm,
                  }}
                >
                  Trigger
                </button>
                <div
                  style={{
                    width: active === name ? '200px' : '40px',
                    height: '40px',
                    backgroundColor: tokens.colors.success,
                    borderRadius: tokens.borderRadius.md,
                    transition: `width ${duration} ${tokens.motion.easing.easeInOut}`,
                  }}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Easing */}
        <section>
          <h3 style={{ fontSize: tokens.typography.fontSize.lg, marginBottom: tokens.spacing.md }}>
            Animation Easing
          </h3>
          <div
            style={{
              fontSize: tokens.typography.fontSize.sm,
              color: tokens.colors.text.secondary,
              marginBottom: tokens.spacing.md,
            }}
          >
            All animations use 300ms duration to show easing differences
          </div>
          {Object.entries(tokens.motion.easing).map(([name, easing]) => (
            <div key={name} style={{ marginBottom: tokens.spacing.lg }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.md }}>
                <div style={{ width: '120px', fontSize: tokens.typography.fontSize.sm }}>
                  <span style={{ fontWeight: tokens.typography.fontWeight.medium }}>{name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActive(name)
                    setTimeout(() => setActive(null), 300)
                  }}
                  style={{
                    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                    backgroundColor: tokens.colors.primary,
                    color: tokens.colors.text.inverse,
                    border: 'none',
                    borderRadius: tokens.borderRadius.md,
                    cursor: 'pointer',
                    fontSize: tokens.typography.fontSize.sm,
                  }}
                >
                  Trigger
                </button>
                <div
                  style={{
                    width: active === name ? '200px' : '40px',
                    height: '40px',
                    backgroundColor: tokens.colors.info,
                    borderRadius: tokens.borderRadius.md,
                    transition: `width 300ms ${easing}`,
                  }}
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    )
  },
}

// Add React import for Motion story
import React from 'react'
