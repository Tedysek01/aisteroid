import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-pink-500/20 bg-[#1a1a1a]/50 px-3 py-2 text-sm text-pink-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-pink-100 placeholder:text-pink-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative z-10',
          className
        )}
        ref={ref}
        style={{ 
          ...style,
          pointerEvents: 'auto',
          position: 'relative',
          zIndex: 10 
        }}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
