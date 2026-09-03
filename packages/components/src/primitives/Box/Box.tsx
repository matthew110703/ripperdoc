import React, { forwardRef } from 'react';
import { cn } from '@ripperdoc-chrome77/utils';
import type { BoxProps } from './Box.types';

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    return (
      <Component ref={ref} className={cn('rd-box', className)} {...props}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
