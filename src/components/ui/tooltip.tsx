import React, { ReactNode } from 'react';

type TooltipProps = {
  content: string;
  children: ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className='relative group'>
      {children}
      <div className='absolute bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs rounded px-2 py-1'>
        {content}
      </div>
    </div>
  );
}
