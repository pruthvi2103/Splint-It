import React, { ReactNode } from 'react';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const Button = ({ children, className, ...rest }: { children: ReactNode; className: string }) => {
  {
    return (
      <button
        type='button'
        className={classNames(
          'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
};

const PageButton = ({ children, className, ...rest }: { children: ReactNode; className: string }) => {
  return (
    <button
      type='button'
      className={classNames(
        'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

// Table actions button
const tableActionBtn = (title: string) => {
  return (
    <button className={`rounded-md py-1 px-2 text-sm font-medium border-2 mr-2 ${'border-gray-700'}`}>
      {title}
    </button>
  );
};

export { PageButton, Button, classNames, tableActionBtn };
