import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  MotionProvider,
  useMotionConfig,
  useReducedMotion,
  Fade,
  Slide,
  Scale,
  Collapse,
  Stagger,
  StaggerItem,
  Attention,
  MotionBox,
  motion,
  AnimatePresence,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
} from '@ripperdoc-chrome77/components';
import { motionTokens, durations, easings, springs } from '@ripperdoc-chrome77/tokens';

const meta = {
  title: 'Foundations/Motion System',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Common Cyberpunk SVG Icons ---
const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// --- Shared Global Control Header ---
const GlobalMotionHUD: React.FC = () => {
  const { disabled, setDisabled, reducedMotion, setReducedMotion } = useMotionConfig();
  const isReduced = useReducedMotion();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--rd-color-surface-container)',
        border: disabled ? '1px solid var(--rd-color-error)' : '1px solid var(--rd-color-outline-variant)',
        borderRadius: 'var(--rd-radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: disabled ? '0 0 20px rgba(239, 68, 68, 0.15)' : '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'all 200ms ease',
      }}
    >
      {/* Top Bar with Primary Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Global Toggle Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>Global Motion:</span>
            <button
              onClick={() => setDisabled(!disabled)}
              style={{
                fontFamily: 'var(--rd-font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: 'var(--rd-radius-full)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: disabled ? 'var(--rd-color-error-container)' : 'rgba(34, 197, 94, 0.2)',
                color: disabled ? 'var(--rd-color-on-error-container)' : '#4ade80',
                boxShadow: disabled ? '0 0 12px rgba(239, 68, 68, 0.3)' : '0 0 12px rgba(34, 197, 94, 0.2)',
                transition: 'all 150ms ease',
              }}
            >
              {disabled ? '✕ MOTION DISABLED (0ms !important)' : '✓ MOTION ACTIVE (DEFAULT)'}
            </button>
          </div>

          {/* Reduced Motion Modes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Reduced Motion Mode:</span>
            <div
              style={{
                display: 'flex',
                gap: '0.25rem',
                backgroundColor: 'var(--rd-color-surface-container-lowest)',
                padding: '3px',
                borderRadius: 'var(--rd-radius-md)',
              }}
            >
              {(['user', 'always', 'never'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setReducedMotion(mode)}
                  style={{
                    fontFamily: 'var(--rd-font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '5px 12px',
                    borderRadius: 'var(--rd-radius-sm)',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: reducedMotion === mode ? 'var(--rd-color-primary)' : 'transparent',
                    color: reducedMotion === mode ? 'var(--rd-color-on-primary)' : 'var(--rd-color-on-surface-variant)',
                    transition: 'all 150ms ease',
                  }}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Diagnostics & Info Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Badge
            variant={disabled ? 'error' : isReduced ? 'warning' : 'success'}
            size="md"
            pill
            pulse={!disabled && !isReduced}
          >
            {disabled ? '● ALL MOTION FROZEN' : isReduced ? '▲ REDUCED MOTION' : '● FULL SPRINGS LIVE'}
          </Badge>

          <button
            onClick={() => setShowInfo(!showInfo)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--rd-color-primary)',
              fontFamily: 'var(--rd-font-mono)',
              fontSize: '11px',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: 600,
            }}
          >
            {showInfo ? 'Close Info ▲' : 'What does this bar do? ▼'}
          </button>
        </div>
      </div>

      {/* Reactive Alert Banners */}
      {disabled && (
        <div
          style={{
            padding: '10px 14px',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid var(--rd-color-error)',
            borderRadius: 'var(--rd-radius-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
          }}
        >
          <div>
            <strong style={{ color: 'var(--rd-color-error)' }}>⛔ ALL ANIMATIONS FROZEN:</strong> Every JavaScript transform and spring has been locked to resting position. CSS duration variables (<code>--rd-duration-*</code>) are clamped to <code>0ms !important</code>.
          </div>
          <Button variant="secondary" size="sm" onClick={() => setDisabled(false)}>
            Resume All Motion
          </Button>
        </div>
      )}

      {/* Educational Explanation Drawer */}
      {showInfo && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--rd-color-surface-container-lowest)',
            borderRadius: 'var(--rd-radius-md)',
            border: '1px solid var(--rd-color-outline-variant)',
            fontSize: '12px',
            lineHeight: 1.7,
            color: 'var(--rd-color-on-surface)',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--rd-color-primary)' }}>
            ABOUT THE GLOBAL MOTION CONFIGURATION
          </div>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            This bar lets you simulate how your entire micro-frontend behaves when wrapped in Ripperdoc's <code>&lt;MotionProvider&gt;</code>:
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li><strong>Global Motion Button:</strong> Toggles <code>disabled={'{true}'}</code>. When toggled OFF, every 60fps animation, hover spring, drag gesture, and CSS transition across the entire page freezes instantaneously into its resting state.</li>
            <li><strong>Reduced Motion (USER | ALWAYS | NEVER):</strong> Controls accessibility compliance. In <code>ALWAYS</code> mode, high-velocity transforms, bouncing springs, and 3D tilts are suppressed, leaving only calm opacity transitions for users sensitive to motion sickness.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// STORY 1: OVERVIEW & CONTROL CENTER
// ============================================================================
const OverviewContent: React.FC = () => {
  const { disabled } = useMotionConfig();

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          FOUNDATIONS // MOTION CONTROL STATION
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
          Motion Platform Overview
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--rd-color-on-surface-variant)', margin: 0, maxWidth: '680px', lineHeight: 1.6 }}>
          Ripperdoc uses a strict <strong>Tokens → Primitives → Components</strong> motion architecture. Motion is enabled by default across all micro-frontends with spring physics and fluid micro-interactions, while providing global zero-motion toggles and per-component opt-out.
        </p>
      </div>

      <GlobalMotionHUD />

      {/* Live Interactive Verification Plate */}
      <div
        style={{
          backgroundColor: 'var(--rd-color-surface-container)',
          border: '1px solid var(--rd-color-outline-variant)',
          borderRadius: 'var(--rd-radius-lg)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '16px', fontWeight: 600 }}>Live Motion Verification Plate</h3>
        <p style={{ margin: '0 0 1.25rem 0', fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
          Interact with the components below while toggling Global Motion in the bar above to verify live feedback.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
              BUTTON SPRING TEST (CLICK ME)
            </span>
            <Button variant="primary">Tap Spring {disabled ? '(Disabled)' : '(Active)'}</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
              CARD HOVER LIFT (HOVER OVER ME)
            </span>
            <Card interactive>
              <CardHeader>
                <Badge variant="primary" size="sm" pulse={!disabled}>LIVE</Badge>
                <CardTitle>Interactive Spring Card</CardTitle>
                <CardDescription>Hover over to observe spring lift (-4px)</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Core Feature Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <Card elevation={1}>
          <CardHeader>
            <Badge variant="primary" size="sm">LAYER 1</Badge>
            <CardTitle>Centralized Motion Tokens</CardTitle>
            <CardDescription>Zero scattered numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--rd-color-on-surface-variant)' }}>
              Durations (<code>fast: 150ms</code>, <code>normal: 250ms</code>, <code>slow: 400ms</code>), cubic-bezier easing curves, and physics springs (<code>snappy</code>, <code>gentle</code>, <code>bouncy</code>, <code>stiff</code>) are declared centrally in <code>@ripperdoc-chrome77/tokens</code>.
            </div>
          </CardContent>
        </Card>

        <Card elevation={1}>
          <CardHeader>
            <Badge variant="success" size="sm">LAYER 2</Badge>
            <CardTitle>Declarative Primitives</CardTitle>
            <CardDescription>Composable motion blocks</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--rd-color-on-surface-variant)' }}>
              Reusable primitives like <code>&lt;Fade&gt;</code>, <code>&lt;Slide&gt;</code>, <code>&lt;Scale&gt;</code>, <code>&lt;Collapse&gt;</code>, <code>&lt;Stagger&gt;</code>, <code>&lt;Attention&gt;</code>, and <code>&lt;MotionBox&gt;</code> encapsulate exit animations and state transitions.
            </div>
          </CardContent>
        </Card>

        <Card elevation={1}>
          <CardHeader>
            <Badge variant="warning" size="sm">LAYER 3</Badge>
            <CardTitle>Component Compliance</CardTitle>
            <CardDescription>Active by default, opt-out ready</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--rd-color-on-surface-variant)' }}>
              UI primitives like <code>Button</code>, <code>Card</code>, and <code>Badge</code> feature built-in spring gestures. Every component accepts <code>motion={'{false}'}</code> for localized opt-out, and honors global <code>MotionProvider</code>.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const OverviewAndControls: Story = {
  render: () => (
    <MotionProvider>
      <OverviewContent />
    </MotionProvider>
  ),
};

// ============================================================================
// STORY 2: LIVE CORE MOTIONS SHOWCASE (CONTINUOUS FLUID MOTION - NO PAUSES)
// ============================================================================
const CoreMotionsContent: React.FC = () => {
  const { disabled } = useMotionConfig();
  const [singleTrigger, setSingleTrigger] = useState(0);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            FOUNDATIONS // CORE REUSABLE MOTIONS
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
            Live Core Motions Matrix
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
            Fluid, seamlessly looping motion without awkward pauses. Toggling Global Motion in the bar freezes all elements immediately.
          </p>
        </div>

        <Button variant="secondary" size="sm" leadingIcon={<RefreshIcon />} onClick={() => setSingleTrigger((t) => t + 1)}>
          PULSE RE-SYNC
        </Button>
      </div>

      <GlobalMotionHUD />

      {/* Seamless Continuous Looping Motions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {[
          {
            title: 'Fade In / Out',
            preset: 'fadeIn / fadeOut',
            token: 'durations.normal',
            element: (
              <motion.div
                key={`fade-${singleTrigger}`}
                animate={disabled ? { opacity: 1 } : { opacity: [1, 0.15, 1] }}
                transition={disabled ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-primary)', color: 'var(--rd-color-on-primary)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                FADE LOOP
              </motion.div>
            ),
          },
          {
            title: 'Fade + Scale',
            preset: 'fadeScale',
            token: 'springs.snappy',
            element: (
              <motion.div
                key={`scale-${singleTrigger}`}
                animate={disabled ? { opacity: 1, scale: 1 } : { opacity: [1, 0.25, 1], scale: [1, 0.8, 1] }}
                transition={disabled ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-primary)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                FADE + SCALE
              </motion.div>
            ),
          },
          {
            title: 'Fade + Slide Up',
            preset: 'fadeSlideUp',
            token: 'durations.normal',
            element: (
              <motion.div
                key={`slideup-${singleTrigger}`}
                animate={disabled ? { opacity: 1, y: 0 } : { opacity: [1, 0.2, 1], y: [0, -22, 0] }}
                transition={disabled ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-outline-variant)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                SLIDE UP ↑
              </motion.div>
            ),
          },
          {
            title: 'Fade + Slide Down',
            preset: 'fadeSlideDown',
            token: 'durations.normal',
            element: (
              <motion.div
                key={`slidedown-${singleTrigger}`}
                animate={disabled ? { opacity: 1, y: 0 } : { opacity: [1, 0.2, 1], y: [0, 22, 0] }}
                transition={disabled ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-outline-variant)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                SLIDE DOWN ↓
              </motion.div>
            ),
          },
          {
            title: 'Fade + Slide Left',
            preset: 'fadeSlideLeft',
            token: 'durations.normal',
            element: (
              <motion.div
                key={`slideleft-${singleTrigger}`}
                animate={disabled ? { opacity: 1, x: 0 } : { opacity: [1, 0.2, 1], x: [0, -24, 0] }}
                transition={disabled ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-outline-variant)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                SLIDE LEFT ←
              </motion.div>
            ),
          },
          {
            title: 'Fade + Slide Right',
            preset: 'fadeSlideRight',
            token: 'durations.normal',
            element: (
              <motion.div
                key={`slideright-${singleTrigger}`}
                animate={disabled ? { opacity: 1, x: 0 } : { opacity: [1, 0.2, 1], x: [0, 24, 0] }}
                transition={disabled ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-outline-variant)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                SLIDE RIGHT →
              </motion.div>
            ),
          },
          {
            title: 'Scale In / Out',
            preset: 'scaleIn / scaleOut',
            token: 'springs.bouncy',
            element: (
              <motion.div
                key={`scalein-${singleTrigger}`}
                animate={disabled ? { scale: 1 } : { scale: [1, 0.6, 1] }}
                transition={disabled ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                SCALE OSCILLATION
              </motion.div>
            ),
          },
          {
            title: 'Blur In / Out',
            preset: 'blur',
            token: 'durations.slow',
            element: (
              <motion.div
                key={`blur-${singleTrigger}`}
                animate={disabled ? { filter: 'blur(0px)', opacity: 1 } : { filter: ['blur(0px)', 'blur(10px)', 'blur(0px)'], opacity: [1, 0.4, 1] }}
                transition={disabled ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-outline-variant)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                BLUR CYCLE
              </motion.div>
            ),
          },
          {
            title: 'Continuous Rotate',
            preset: 'rotate',
            token: 'easings.linear',
            element: (
              <motion.div
                animate={disabled ? { rotate: 0 } : { rotate: [0, 360] }}
                transition={disabled ? { duration: 0 } : { duration: 3.5, repeat: Infinity, ease: 'linear' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-primary)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                ROTATE 360°
              </motion.div>
            ),
          },
          {
            title: 'Pulse Breathing Loop',
            preset: 'pulse',
            token: 'durations.slow',
            element: (
              <motion.div
                animate={disabled ? { scale: 1, opacity: 1 } : { scale: [1, 1.1, 1], opacity: [1, 0.75, 1] }}
                transition={disabled ? { duration: 0 } : { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-primary-container)', color: 'var(--rd-color-on-primary-container)', borderRadius: 'var(--rd-radius-md)', fontWeight: 700 }}
              >
                ● LIVE HEARTBEAT
              </motion.div>
            ),
          },
          {
            title: 'Bounce Motion',
            preset: 'bounce',
            token: 'springs.bouncy',
            element: (
              <motion.div
                animate={disabled ? { y: 0 } : { y: [0, -18, 0, -8, 0] }}
                transition={disabled ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#facc15', borderRadius: 'var(--rd-radius-md)', fontWeight: 700 }}
              >
                ▲ CONTINUOUS BOUNCE
              </motion.div>
            ),
          },
          {
            title: 'Wiggle Nudge',
            preset: 'wiggle',
            token: 'durations.normal',
            element: (
              <motion.div
                animate={disabled ? { rotate: 0 } : { rotate: [0, -8, 8, -6, 6, -3, 3, 0] }}
                transition={disabled ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--rd-color-surface-container-high)', border: '1px solid var(--rd-color-outline-variant)', borderRadius: 'var(--rd-radius-md)', fontWeight: 600 }}
              >
                ~ WIGGLE ALERT ~
              </motion.div>
            ),
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'var(--rd-color-surface-container)',
              border: '1px solid var(--rd-color-outline-variant)',
              borderRadius: 'var(--rd-radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{card.title}</span>
              <code style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '10px', color: 'var(--rd-color-primary)' }}>
                {card.preset}
              </code>
            </div>

            <div
              style={{
                backgroundColor: 'var(--rd-color-surface-container-lowest)',
                borderRadius: 'var(--rd-radius-md)',
                padding: '1rem',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {card.element}
            </div>
          </div>
        ))}
      </div>

      {/* Seamless Stagger Wave Stream (Continuous Fluid Wave) */}
      <div
        style={{
          marginTop: '2rem',
          backgroundColor: 'var(--rd-color-surface-container)',
          border: '1px solid var(--rd-color-outline-variant)',
          borderRadius: 'var(--rd-radius-lg)',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '16px', fontWeight: 600 }}>Continuous Stagger Wave</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
              A continuous, undulating fluid wave rippling across children with staggered offsets.
            </p>
          </div>
          <Badge variant="primary" size="sm" pill pulse={!disabled}>
            {disabled ? 'FROZEN' : 'WAVE ACTIVE'}
          </Badge>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[1, 2, 3, 4].map((item, idx) => (
            <motion.div
              key={item}
              animate={disabled ? { y: 0, opacity: 1 } : { y: [0, -12, 0], opacity: [0.75, 1, 0.75] }}
              transition={disabled ? { duration: 0 } : { duration: 1.6, repeat: Infinity, delay: idx * 0.18, ease: 'easeInOut' }}
              style={{
                backgroundColor: 'var(--rd-color-surface-container-lowest)',
                border: '1px solid var(--rd-color-outline-variant)',
                borderRadius: 'var(--rd-radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)' }}>
                STREAM CHANNEL // 0{item}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Wave Node 0{item}</span>
              <span style={{ fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
                Phase offset: {(idx * 0.18).toFixed(2)}s
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CoreMotionsLiveShowcase: Story = {
  render: () => (
    <MotionProvider>
      <CoreMotionsContent />
    </MotionProvider>
  ),
};

// ============================================================================
// STORY 3: INTERACTIVE GESTURE PHYSICS SANDBOX
// ============================================================================
const GesturePhysicsContent: React.FC = () => {
  const { disabled } = useMotionConfig();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 8);
    setRotateY(x / 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          FOUNDATIONS // TACTILE GESTURE PHYSICS
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
          Interactive Gestures & Physics
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
          Physical drag elasticity, 3D cursor perspective tilt, magnetic cursor pull, and tactile spring presses.
        </p>
      </div>

      <GlobalMotionHUD />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* 3D Perspective Tilt Card */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container)',
            border: '1px solid var(--rd-color-outline-variant)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>3D Spatial Cursor Tilt</h3>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
            Hover and move your mouse over this panel to see real-time 3D angular physics.
          </p>

          <div
            style={{
              perspective: '800px',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX: disabled ? 0 : rotateX, rotateY: disabled ? 0 : rotateY }}
              transition={disabled ? { duration: 0 } : springs.snappy}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--rd-color-surface-container-lowest)',
                border: '1px solid var(--rd-color-primary)',
                borderRadius: 'var(--rd-radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: disabled ? 'default' : 'crosshair',
                boxShadow: 'var(--rd-shadow-level-2)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div style={{ transform: 'translateZ(20px)' }}>
                <Badge variant="primary" size="sm" pill>
                  3D PERSPECTIVE
                </Badge>
                <div style={{ fontSize: '16px', fontWeight: 700, marginTop: '0.5rem' }}>
                  Interactive Gyroscopic Plate
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface-variant)', marginTop: '0.25rem' }}>
                  {disabled ? 'LOCKED (0°)' : `rX: ${rotateX.toFixed(1)}° | rY: ${rotateY.toFixed(1)}°`}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Elastic Drag Playground */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container)',
            border: '1px solid var(--rd-color-outline-variant)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Elastic Drag with Snapback Inertia</h3>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
            Grab and throw the element anywhere in the bounding arena.
          </p>

          <div
            style={{
              height: '180px',
              backgroundColor: 'var(--rd-color-surface-container-lowest)',
              borderRadius: 'var(--rd-radius-lg)',
              border: '1px dashed var(--rd-color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              drag={!disabled}
              dragConstraints={{ left: -120, right: 120, top: -50, bottom: 50 }}
              dragElastic={0.25}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
              whileHover={disabled ? undefined : { scale: 1.05 }}
              whileDrag={disabled ? undefined : { scale: 1.15, cursor: 'grabbing', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}
              style={{
                padding: '14px 24px',
                backgroundColor: 'var(--rd-color-primary)',
                color: 'var(--rd-color-on-primary)',
                borderRadius: 'var(--rd-radius-md)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: disabled ? 'default' : 'grab',
                userSelect: 'none',
                textAlign: 'center',
                opacity: disabled ? 0.6 : 1,
              }}
            >
              {disabled ? 'DRAG DISABLED' : 'DRAG & THROW ME'}
            </motion.div>
          </div>
        </div>

        {/* Tactile Magnetic Button & Springs */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container)',
            border: '1px solid var(--rd-color-outline-variant)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Magnetic Attraction & Tactile Tap</h3>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
            Button spring physics with micro-magnetic pull toward cursor position.
          </p>

          <div
            onMouseMove={(e) => {
              if (disabled) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
              setMagneticPos({ x, y });
            }}
            onMouseLeave={() => setMagneticPos({ x: 0, y: 0 })}
            style={{
              height: '180px',
              backgroundColor: 'var(--rd-color-surface-container-lowest)',
              borderRadius: 'var(--rd-radius-lg)',
              border: '1px solid var(--rd-color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.button
              animate={{ x: disabled ? 0 : magneticPos.x, y: disabled ? 0 : magneticPos.y }}
              whileTap={disabled ? undefined : { scale: 0.92 }}
              transition={disabled ? { duration: 0 } : springs.snappy}
              style={{
                padding: '14px 28px',
                backgroundColor: 'var(--rd-color-surface-container-high)',
                color: 'var(--rd-color-primary)',
                border: '2px solid var(--rd-color-primary)',
                borderRadius: 'var(--rd-radius-md)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: 'var(--rd-shadow-level-1)',
              }}
            >
              {disabled ? 'STATIC BUTTON' : 'MAGNETIC PULL'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveGesturePhysics: Story = {
  render: () => (
    <MotionProvider>
      <GesturePhysicsContent />
    </MotionProvider>
  ),
};

// ============================================================================
// STORY 4: ATTENTION SEEKERS & KEYFRAMES (ALIVE RADAR & ALERTS)
// ============================================================================
const AttentionSeekersContent: React.FC = () => {
  const { disabled } = useMotionConfig();
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [badgeCount, setBadgeCount] = useState(1);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          FOUNDATIONS // ATTENTION KEYFRAMES
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
          Alive Attention Seekers
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
          Dynamic keyframe animations: live radar pulse beacons, vibrating error alerts, and bouncing notification counters.
        </p>
      </div>

      <GlobalMotionHUD />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Live Radar Beacon Pulse */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container)',
            border: '1px solid var(--rd-color-outline-variant)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '16px', fontWeight: 600 }}>Broadcasting Radar Pulse</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
              Continuous concentric pulse waves for live streams and telemetry broadcasts.
            </p>
          </div>

          <div
            style={{
              height: '160px',
              backgroundColor: 'var(--rd-color-surface-container-lowest)',
              borderRadius: 'var(--rd-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {!disabled &&
              [0, 0.6, 1.2].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 2.8],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay,
                    ease: easings.standard,
                  }}
                  style={{
                    position: 'absolute',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '2px solid var(--rd-color-primary)',
                    pointerEvents: 'none',
                  }}
                />
              ))}

            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--rd-color-primary)',
                boxShadow: disabled ? 'none' : '0 0 16px var(--rd-color-primary)',
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* Interactive Shake Validation */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container)',
            border: '1px solid var(--rd-color-outline-variant)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '16px', fontWeight: 600 }}>Input Validation Shake</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
              Haptic horizontal shake communicating blocked submission or unauthorized access.
            </p>
          </div>

          <Attention variant="shake" trigger={shakeTrigger}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--rd-color-surface-container-lowest)',
                border: '1px solid var(--rd-color-error)',
                borderRadius: 'var(--rd-radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--rd-color-error)' }}>
                ACCESS DENIED: NODE #0492
              </span>
              <Badge variant="error" size="sm">403 FORBIDDEN</Badge>
            </div>
          </Attention>

          <Button variant="danger" size="sm" onClick={() => setShakeTrigger((t) => t + 1)}>
            TRIGGER ERROR SHAKE
          </Button>
        </div>

        {/* Bouncing Notification Increment */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container)',
            border: '1px solid var(--rd-color-outline-variant)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '16px', fontWeight: 600 }}>Bouncing Counter Badge</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
              Playful spring bounce triggered upon incrementing live alerts.
            </p>
          </div>

          <div
            style={{
              height: '100px',
              backgroundColor: 'var(--rd-color-surface-container-lowest)',
              borderRadius: 'var(--rd-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Incoming Signals</span>
            <motion.div
              key={badgeCount}
              initial={disabled ? false : { scale: 0.4, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              transition={disabled ? { duration: 0 } : springs.bouncy}
            >
              <Badge variant="warning" size="md" pill>
                +{badgeCount} NEW
              </Badge>
            </motion.div>
          </div>

          <Button variant="secondary" size="sm" onClick={() => setBadgeCount((c) => c + 1)}>
            + SEND NOTIFICATION
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AttentionSeekersLive: Story = {
  render: () => (
    <MotionProvider>
      <AttentionSeekersContent />
    </MotionProvider>
  ),
};

// ============================================================================
// STORY 5: SHARED LAYOUT & MORPHING (layoutId)
// ============================================================================
const SharedLayoutContent: React.FC = () => {
  const { disabled } = useMotionConfig();
  const tabs = ['OVERVIEW', 'TELEMETRY', 'SPECTROGRAM', 'FIREWALL', 'TERMINAL'];
  const [activeTab, setActiveTab] = useState('TELEMETRY');
  const [autoCycle, setAutoCycle] = useState(true);

  // Smooth auto-cycle between tabs
  useEffect(() => {
    if (!autoCycle || disabled) return;
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        const nextIdx = (tabs.indexOf(curr) + 1) % tabs.length;
        return tabs[nextIdx];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [autoCycle, disabled]);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            FOUNDATIONS // SHARED LAYOUT ENGINE
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
            Shared Layout Morphing (`layoutId`)
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
            Smooth pill indicator gliding between navigation options with zero morphing stutter.
          </p>
        </div>

        <Button
          variant={autoCycle ? 'primary' : 'secondary'}
          size="sm"
          leadingIcon={autoCycle ? <PauseIcon /> : <PlayIcon />}
          onClick={() => setAutoCycle(!autoCycle)}
        >
          {autoCycle ? 'AUTO-GLIDE ACTIVE' : 'AUTO-GLIDE PAUSED'}
        </Button>
      </div>

      <GlobalMotionHUD />

      <div
        style={{
          backgroundColor: 'var(--rd-color-surface-container)',
          border: '1px solid var(--rd-color-outline-variant)',
          borderRadius: 'var(--rd-radius-lg)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {/* Morphing Pill Navigation */}
        <div>
          <div style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)', marginBottom: '0.75rem' }}>
            ACTIVE SECTION SELECTOR
          </div>

          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--rd-color-surface-container-lowest)',
              padding: '5px',
              borderRadius: 'var(--rd-radius-full)',
              border: '1px solid var(--rd-color-outline-variant)',
              flexWrap: 'wrap',
              gap: '4px',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setAutoCycle(false);
                }}
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 20px',
                  fontFamily: 'var(--rd-font-sans)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: activeTab === tab ? 'var(--rd-color-on-primary)' : 'var(--rd-color-on-surface-variant)',
                  cursor: 'pointer',
                  zIndex: 1,
                  transition: 'color 150ms ease',
                }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="sharedGlidingPill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--rd-color-primary)',
                      borderRadius: 'var(--rd-radius-full)',
                      zIndex: -1,
                      boxShadow: disabled ? 'none' : '0 2px 10px rgba(0,0,0,0.2)',
                    }}
                    transition={disabled ? { duration: 0 } : springs.snappy}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Morphing to Active Tab Content */}
        <motion.div
          key={activeTab}
          initial={disabled ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={disabled ? undefined : { opacity: 0, y: -8 }}
          transition={disabled ? { duration: 0 } : springs.snappy}
          style={{
            padding: '1.75rem',
            backgroundColor: 'var(--rd-color-surface-container-lowest)',
            border: '1px solid var(--rd-color-outline-variant)',
            borderRadius: 'var(--rd-radius-lg)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '18px', fontWeight: 700 }}>Active Stream: {activeTab}</span>
            <Badge variant="primary" size="sm">SYNCED // 120 FPS</Badge>
          </div>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: 'var(--rd-color-on-surface-variant)' }}>
            Because <code>layoutId</code> coordinates bounding boxes across render passes, layout animations maintain continuity without jump-cuts. Micro-frontends can switch perspectives or swap visual modes with cinematic fluidity.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const SharedLayoutAndMorphing: Story = {
  render: () => (
    <MotionProvider>
      <SharedLayoutContent />
    </MotionProvider>
  ),
};

// ============================================================================
// STORY 6: PHYSICS LABORATORY (GENUINE CONTINUOUS SPRING PHYSICS - NO PAUSES)
// ============================================================================
const SpringTrackItem: React.FC<{
  name: string;
  desc: string;
  springConfig: { type: 'spring'; stiffness: number; damping: number; mass: number };
  disabled: boolean;
}> = ({ name, desc, springConfig, disabled }) => {
  const [target, setTarget] = useState<number>(1);

  return (
    <div
      style={{
        backgroundColor: 'var(--rd-color-surface-container-lowest)',
        border: '1px solid var(--rd-color-outline-variant)',
        borderRadius: 'var(--rd-radius-md)',
        padding: '1rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '13px', fontWeight: 600 }}>{name}</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
          {desc}
        </span>
      </div>

      <div
        style={{
          height: '32px',
          backgroundColor: 'var(--rd-color-surface-container)',
          borderRadius: 'var(--rd-radius-sm)',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '0.5rem',
        }}
      >
        <motion.div
          animate={disabled ? { x: 0 } : { x: target === 1 ? 520 : 0 }}
          transition={disabled ? { duration: 0 } : springConfig}
          onAnimationComplete={() => {
            if (!disabled) {
              setTarget((prev) => (prev === 1 ? 0 : 1));
            }
          }}
          style={{
            height: '100%',
            width: '68px',
            backgroundColor: 'var(--rd-color-primary)',
            borderRadius: 'var(--rd-radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--rd-color-on-primary)',
          }}
        >
          {name.split(' ')[0].toUpperCase()}
        </motion.div>
      </div>
    </div>
  );
};

const PhysicsLabContent: React.FC = () => {
  const { disabled } = useMotionConfig();
  const [stiffness, setStiffness] = useState(400);
  const [damping, setDamping] = useState(25);
  const [mass, setMass] = useState(0.8);
  const [targetX, setTargetX] = useState<number>(110);
  const [autoOscillate, setAutoOscillate] = useState(true);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            FOUNDATIONS // SPRING PHYSICS TUNER
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
            Spring Physics Laboratory
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
            Live, zero-pause spring physics. Adjust sliders to instantly feel how stiffness, damping, and mass govern oscillation frequency and overshoot in real time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            variant={autoOscillate ? 'primary' : 'secondary'}
            size="sm"
            leadingIcon={autoOscillate ? <PauseIcon /> : <PlayIcon />}
            onClick={() => setAutoOscillate(!autoOscillate)}
          >
            {autoOscillate ? 'AUTO-OSCILLATOR: ACTIVE' : 'AUTO-OSCILLATOR: PAUSED'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStiffness(400);
              setDamping(25);
              setMass(0.8);
            }}
          >
            RESET DEFAULTS
          </Button>
        </div>
      </div>

      <GlobalMotionHUD />

      {/* Interactive Live Tuner */}
      <div
        style={{
          backgroundColor: 'var(--rd-color-surface-container)',
          border: '1px solid var(--rd-color-outline-variant)',
          borderRadius: 'var(--rd-radius-lg)',
          padding: '1.5rem',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Physics Parameters</h3>
            <span style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
              LIVE FEEDBACK
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '0.5rem' }}>
              <span>Stiffness (Tension / Speed):</span>
              <code style={{ color: 'var(--rd-color-primary)', fontWeight: 700 }}>{stiffness}</code>
            </div>
            <input
              type="range"
              min="50"
              max="900"
              step="25"
              value={stiffness}
              onChange={(e) => setStiffness(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--rd-color-primary)' }}
            />
            <div style={{ fontSize: '10px', color: 'var(--rd-color-on-surface-variant)', marginTop: '2px' }}>
              Low (50) = Lazy loose wire | High (900) = Hyper-taut instant snap
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '0.5rem' }}>
              <span>Damping (Friction / Oscillation):</span>
              <code style={{ color: 'var(--rd-color-primary)', fontWeight: 700 }}>{damping}</code>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={damping}
              onChange={(e) => setDamping(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--rd-color-primary)' }}
            />
            <div style={{ fontSize: '10px', color: 'var(--rd-color-on-surface-variant)', marginTop: '2px' }}>
              Low (5) = Wild bouncy wobble | High (60) = No bounce, heavy fluid drag
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '0.5rem' }}>
              <span>Mass (Inertia Weight):</span>
              <code style={{ color: 'var(--rd-color-primary)', fontWeight: 700 }}>{mass.toFixed(1)}</code>
            </div>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--rd-color-primary)' }}
            />
            <div style={{ fontSize: '10px', color: 'var(--rd-color-on-surface-variant)', marginTop: '2px' }}>
              Low (0.2) = Featherweight nimble | High (3.0) = Heavy sledgehammer momentum
            </div>
          </div>
        </div>

        {/* Live Tuner Playground with Dynamic Spring Oscillation & Drag-To-Snap */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container-lowest)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '220px',
          }}
        >
          {/* Track Guidelines */}
          <div
            style={{
              position: 'absolute',
              width: '280px',
              height: '2px',
              backgroundColor: 'var(--rd-color-outline-variant)',
              top: '50%',
              transform: 'translateY(-1px)',
            }}
          />

          <motion.div
            drag={!disabled ? 'x' : false}
            dragConstraints={{ left: -120, right: 120 }}
            dragElastic={0.5}
            animate={
              disabled
                ? { x: 0 }
                : autoOscillate
                ? { x: targetX }
                : { x: 0 }
            }
            transition={
              disabled
                ? { duration: 0 }
                : {
                    type: 'spring',
                    stiffness,
                    damping,
                    mass,
                  }
            }
            onAnimationComplete={() => {
              if (!disabled && autoOscillate) {
                // Immediately ping-pong with zero pause
                setTargetX((prev) => (prev > 0 ? -110 : 110));
              }
            }}
            style={{
              width: '90px',
              height: '90px',
              backgroundColor: 'var(--rd-color-primary)',
              borderRadius: 'var(--rd-radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--rd-color-on-primary)',
              fontWeight: 700,
              boxShadow: disabled ? 'none' : '0 10px 25px rgba(0,0,0,0.3)',
              cursor: disabled ? 'default' : 'grab',
              userSelect: 'none',
              zIndex: 2,
            }}
          >
            <span style={{ fontSize: '13px', letterSpacing: '0.04em' }}>SPRING</span>
            <span style={{ fontSize: '9px', fontFamily: 'var(--rd-font-mono)', opacity: 0.85, marginTop: '2px' }}>
              k={stiffness} c={damping}
            </span>
          </motion.div>

          <span style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface-variant)', zIndex: 2 }}>
            {disabled
              ? '⛔ SPRING FROZEN (0ms)'
              : autoOscillate
              ? 'Continuous Oscillation | Grab & Stretch with Mouse'
              : 'Oscillator Paused | Drag & Release to Test Snap'}
          </span>
        </div>
      </div>

      {/* Real Spring Race Tracks (Each Using Its Actual Spring Physics Preset) */}
      <div
        style={{
          backgroundColor: 'var(--rd-color-surface-container)',
          border: '1px solid var(--rd-color-outline-variant)',
          borderRadius: 'var(--rd-radius-lg)',
          padding: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '16px', fontWeight: 600 }}>Seamless Physics Race Tracks</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
              Side-by-side comparison using Ripperdoc's actual physics presets. Each node ping-pongs immediately upon settling—no artificial pauses.
            </p>
          </div>
          <Badge variant="primary" size="sm" pill pulse={!disabled}>
            {disabled ? 'RACE FROZEN' : 'RACE ACTIVE'}
          </Badge>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <SpringTrackItem
            name="Snappy (Recommended Default)"
            desc="Stiffness: 400 | Damping: 30 | Mass: 0.8"
            springConfig={springs.snappy}
            disabled={disabled}
          />
          <SpringTrackItem
            name="Gentle (Modals & Drawers)"
            desc="Stiffness: 200 | Damping: 25 | Mass: 1.0"
            springConfig={springs.gentle}
            disabled={disabled}
          />
          <SpringTrackItem
            name="Bouncy (Alerts & Badges)"
            desc="Stiffness: 300 | Damping: 15 | Mass: 1.0"
            springConfig={springs.bouncy}
            disabled={disabled}
          />
          <SpringTrackItem
            name="Stiff (High-Speed Tactile Snap)"
            desc="Stiffness: 500 | Damping: 35 | Mass: 0.5"
            springConfig={springs.stiff}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export const PhysicsLaboratory: Story = {
  render: () => (
    <MotionProvider>
      <PhysicsLabContent />
    </MotionProvider>
  ),
};

// ============================================================================
// STORY 7: REAL-WORLD CINEMATIC MFE DASHBOARD (FULL ALIVE INTEGRATION)
// ============================================================================
const MFEDashboardContent: React.FC = () => {
  const { disabled } = useMotionConfig();
  const [isPlaying, setIsPlaying] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [toasts, setToasts] = useState<string[]>(['Neural link established', 'Stream calibrated at 4K HDR']);

  const addToast = (msg: string) => {
    setToasts((curr) => [...curr, msg]);
    setTimeout(() => {
      setToasts((curr) => curr.filter((t) => t !== msg));
    }, 4000);
  };

  const isFeedAlive = isPlaying && !disabled;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            MFE INTEGRATION // CINEMATIC BROADCAST SUITE
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
            Live Micro-Frontend Operations Station
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
            Real-world simulation composed of Ripperdoc motion primitives, responsive telemetry, and reactive HUD.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addToast(`Telemetry Ping #${Math.floor(Math.random() * 900) + 100}`)}
          >
            + TRIGGER TOAST
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            leadingIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
          >
            {isPlaying ? 'PAUSE FEED' : 'RESUME FEED'}
          </Button>
        </div>
      </div>

      <GlobalMotionHUD />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Cinematic Live Player HUD */}
        <Card elevation={2} style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              height: '240px',
              background: 'linear-gradient(135deg, #090e17 0%, #1a2333 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Live Scanning Beam */}
            {isFeedAlive && (
              <motion.div
                animate={{ y: [-120, 120] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--rd-color-primary), transparent)',
                  boxShadow: '0 0 12px var(--rd-color-primary)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Animated Audio Equalizer Bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
              {[0.4, 0.9, 0.6, 1.2, 0.7, 0.5, 1.1, 0.8, 0.3].map((dur, i) => (
                <motion.div
                  key={i}
                  animate={isFeedAlive ? { height: ['15%', '100%', '30%'] } : { height: '20%' }}
                  transition={disabled ? { duration: 0 } : { duration: dur, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  style={{
                    width: '8px',
                    backgroundColor: 'var(--rd-color-primary)',
                    borderRadius: '2px',
                  }}
                />
              ))}
            </div>

            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
              <Badge variant={isFeedAlive ? 'error' : 'neutral'} pill pulse={isFeedAlive}>
                {isFeedAlive ? '● BROADCAST LIVE' : disabled ? 'FEED FROZEN' : 'FEED PAUSED'}
              </Badge>
            </div>

            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
              <span style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: '#94a3b8' }}>
                BITRATE: {disabled ? '0.0 MBPS' : '48.2 MBPS'}
              </span>
            </div>
          </div>

          <CardHeader>
            <CardTitle>Stream Session #0492-X</CardTitle>
            <CardDescription>Primary optical uplink feed with multi-track DRM telemetry</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost" size="sm">Download Logs</Button>
            <Button variant="primary" size="sm">Inspect Telemetry</Button>
          </CardFooter>
        </Card>

        {/* Collapsible Inspection Panel & Real-time Toasts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card elevation={1}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardTitle>System Telemetry Tray</CardTitle>
                <Button variant="secondary" size="sm" onClick={() => setDrawerOpen(!drawerOpen)}>
                  {drawerOpen ? 'HIDE ▲' : 'REVEAL ▼'}
                </Button>
              </div>
              <CardDescription>Hardware load and memory allocation</CardDescription>
            </CardHeader>

            <Collapse isOpen={drawerOpen}>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Frame Render Time:</span>
                    <code style={{ color: 'var(--rd-color-primary)' }}>{disabled ? '0.00ms (Static)' : '4.12ms (144 Hz)'}</code>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GPU Memory Usage:</span>
                    <code style={{ color: '#4ade80' }}>1.4 GB / 8.0 GB</code>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Dropped Frames:</span>
                    <code style={{ color: '#4ade80' }}>0 (0.00%)</code>
                  </div>
                </div>
              </CardContent>
            </Collapse>
          </Card>

          {/* Floating Animated Toasts (AnimatePresence) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <AnimatePresence>
              {toasts.map((toast, idx) => (
                <motion.div
                  key={toast}
                  initial={disabled ? false : { opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={disabled ? undefined : { opacity: 0, x: 50, scale: 0.95 }}
                  transition={disabled ? { duration: 0 } : springs.snappy}
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'var(--rd-color-surface-container-high)',
                    border: '1px solid var(--rd-color-outline-variant)',
                    borderRadius: 'var(--rd-radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: 'var(--rd-shadow-level-2)',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{toast}</span>
                  <button
                    onClick={() => setToasts((curr) => curr.filter((_, i) => i !== idx))}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--rd-color-on-surface-variant)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LiveMFEDashboard: Story = {
  render: () => (
    <MotionProvider>
      <MFEDashboardContent />
    </MotionProvider>
  ),
};
