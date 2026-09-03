import React, { forwardRef } from 'react';
import { cn } from '@ripperdoc-chrome77/utils';
import type { StackProps, StackAlign, StackJustify } from './Stack.types';

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
  (
    {
      gap = 4,
      align = 'stretch',
      justify = 'start',
      direction = 'column',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
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
