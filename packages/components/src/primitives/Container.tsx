import React, { forwardRef } from 'react';
import { cn } from '@ripperdoc-chrome77/utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  className?: string;
  children?: React.ReactNode;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: 'var(--rd-container-max-width, 1440px)',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'full', className, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rd-container', className)}
        style={{
          width: '100%',
          maxWidth: sizeMap[size],
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'var(--rd-space-4)',
          paddingRight: 'var(--rd-space-4)',
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
