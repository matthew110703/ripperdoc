import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { MotionConfig, type Transition } from 'motion/react';
import { transitions } from '@ripperdoc-chrome77/tokens';

export type ReducedMotionOption = 'user' | 'always' | 'never';

export interface MotionContextValue {
  /** Whether motion is completely disabled globally */
  disabled: boolean;
  /** Set whether motion is disabled */
  setDisabled: (disabled: boolean) => void;
  /** Reduced motion preference mode */
  reducedMotion: ReducedMotionOption;
  /** Set reduced motion preference mode */
  setReducedMotion: (mode: ReducedMotionOption) => void;
  /** Default motion transition */
  transition?: Transition;
}

const MotionContext = createContext<MotionContextValue>({
  disabled: false,
  setDisabled: () => {},
  reducedMotion: 'user',
  setReducedMotion: () => {},
  transition: transitions.normal,
});

export interface MotionProviderProps {
  children: React.ReactNode;
  /**
   * Whether animations and transitions are globally disabled.
   * @default false (motion is enabled by default)
   */
  disabled?: boolean;
  /**
   * Reduced motion preference handling.
   * - 'user': Respects OS prefers-reduced-motion setting (default)
   * - 'always': Forces reduced motion mode
   * - 'never': Bypasses OS setting and runs full motion
   * @default 'user'
   */
  reducedMotion?: ReducedMotionOption;
  /**
   * Global default transition curve and duration.
   * @default transitions.normal
   */
  transition?: Transition;
  /**
   * Whether to synchronize motion attributes to the root HTML document element.
   * @default true
   */
  applyToRoot?: boolean;
}

export const MotionProvider: React.FC<MotionProviderProps> = ({
  children,
  disabled: initialDisabled = false,
  reducedMotion: initialReducedMotion = 'user',
  transition = transitions.normal,
  applyToRoot = true,
}) => {
  const [disabled, setDisabled] = useState<boolean>(initialDisabled);
  const [reducedMotion, setReducedMotion] = useState<ReducedMotionOption>(initialReducedMotion);

  // Sync prop changes if parent component updates them
  useEffect(() => {
    setDisabled(initialDisabled);
  }, [initialDisabled]);

  useEffect(() => {
    setReducedMotion(initialReducedMotion);
  }, [initialReducedMotion]);

  // Synchronize CSS attributes on root document for CSS transition suppression
  useEffect(() => {
    if (!applyToRoot || typeof document === 'undefined') return;

    const root = document.documentElement;

    if (disabled) {
      root.setAttribute('data-motion-disabled', 'true');
    } else {
      root.removeAttribute('data-motion-disabled');
    }

    if (reducedMotion === 'always') {
      root.setAttribute('data-reduced-motion', 'true');
    } else if (reducedMotion === 'never') {
      root.setAttribute('data-reduced-motion', 'never');
    } else {
      root.removeAttribute('data-reduced-motion');
    }
  }, [disabled, reducedMotion, applyToRoot]);

  const contextValue = useMemo<MotionContextValue>(
    () => ({
      disabled,
      setDisabled,
      reducedMotion,
      setReducedMotion,
      transition: disabled ? { duration: 0 } : transition,
    }),
    [disabled, reducedMotion, transition]
  );

  // When disabled, motion config receives 'always' for reducedMotion and transition duration 0
  const effectiveReducedMotion = disabled ? 'always' : reducedMotion;
  const effectiveTransition = disabled ? { duration: 0 } : transition;

  return (
    <MotionContext.Provider value={contextValue}>
      <MotionConfig
        reducedMotion={effectiveReducedMotion}
        transition={effectiveTransition}
      >
        <div
          data-motion-disabled={disabled ? 'true' : undefined}
          data-reduced-motion={reducedMotion !== 'user' ? reducedMotion : undefined}
          style={{ display: 'contents' }}
        >
          {children}
        </div>
      </MotionConfig>
    </MotionContext.Provider>
  );
};

/**
 * Hook to access and update the global Motion configuration.
 */
export const useMotionConfig = (): MotionContextValue => {
  return useContext(MotionContext);
};

/**
 * Hook to check if reduced motion is active (via OS setting or provider override).
 */
export const useReducedMotion = (): boolean => {
  const { disabled, reducedMotion } = useMotionConfig();
  const [systemReduced, setSystemReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setSystemReduced(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (disabled) return true;
  if (reducedMotion === 'always') return true;
  if (reducedMotion === 'never') return false;
  return systemReduced;
};

/**
 * Hook to check if interactive animations should run.
 */
export const useIsMotionEnabled = (): boolean => {
  const { disabled } = useMotionConfig();
  const isReduced = useReducedMotion();
  return !disabled && !isReduced;
};
