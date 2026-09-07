import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elevation level: 0 (flat), 1 (standard plate), 2 (elevated) */
  elevation?: 0 | 1 | 2;
  /** Whether to apply glassmorphic frosted backdrop blur */
  glass?: boolean;
  /** Whether the card provides interactive hover lift feedback */
  interactive?: boolean;
  /**
   * Whether motion is enabled. Enabled by default; can be disabled per component or globally.
   * @default true
   */
  motion?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inner content */
  children?: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}
