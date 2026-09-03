import React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Responsive container max-width breakpoint constraint */
  size?: ContainerSize;
  /** Additional CSS class names */
  className?: string;
  /** Inner content */
  children?: React.ReactNode;
}
