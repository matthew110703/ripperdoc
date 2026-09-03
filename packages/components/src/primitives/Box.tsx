import React, { forwardRef } from 'react';
import { cn } from '@ripperdoc-chrome77/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

export const Box = forwardRef<HTMLElement, BoxProps>(({ as: Component = 'div', className, children, ...props }, ref) => {
  return (
    <Component ref={ref} className={cn('rd-box', className)} {...props}>
      {children}
    </Component>
  );
});

Box.displayName = 'Box';
