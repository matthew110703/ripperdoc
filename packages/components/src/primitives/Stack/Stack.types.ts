import React from 'react';

export type StackGap = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between stack items based on the 4px rhythm token scale */
  gap?: StackGap;
  /** Cross-axis alignment */
  align?: StackAlign;
  /** Main-axis distribution */
  justify?: StackJustify;
  /** Stack direction */
  direction?: 'column' | 'column-reverse';
  /** Additional CSS class names */
  className?: string;
  /** Inner elements to stack */
  children?: React.ReactNode;
}
