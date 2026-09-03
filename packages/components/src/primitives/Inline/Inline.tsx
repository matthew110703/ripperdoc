import React, { forwardRef } from 'react';
import { cn } from '@ripperdoc-chrome77/utils';
import type { InlineProps } from './Inline.types';
import type { StackAlign, StackJustify } from '../Stack/Stack.types';

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

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      gap = 2,
      align = 'center',
      justify = 'start',
      wrap = false,
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
        className={cn('rd-inline', className)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: wrap ? 'wrap' : 'nowrap',
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

Inline.displayName = 'Inline';
