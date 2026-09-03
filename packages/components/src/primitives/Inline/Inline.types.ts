import React from 'react';
import type { StackGap, StackAlign, StackJustify } from '../Stack/Stack.types';

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between inline elements based on the 4px rhythm token scale */
  gap?: StackGap;
  /** Cross-axis alignment */
  align?: StackAlign;
  /** Main-axis distribution */
  justify?: StackJustify;
  /** Whether items wrap onto multi-lines */
  wrap?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Child elements to lay out horizontally */
  children?: React.ReactNode;
}
