import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** The underlying HTML element or React component to render */
  as?: React.ElementType;
  /** Additional CSS class names */
  className?: string;
  /** Inner content */
  children?: React.ReactNode;
}
