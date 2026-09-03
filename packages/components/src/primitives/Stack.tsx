import React, { forwardRef } from 'react';
import { cn } from '@ripperdoc-chrome77/utils';

export type StackGap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  direction?: 'column' | 'column-reverse';
  className?: string;
  children?: React.ReactNode;
}

const alignMap: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ gap = 4, align = 'stretch', justify = 'start', direction = 'column', className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rd-stack', className)}
        style={{
          display: 'flex',
          flexDirection: direction,
          gap: `var(--rd-space-${gap})`,
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';
