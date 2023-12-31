import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  onClick?: () => void;
}

const Button = ({ children, color = 'primary', onClick }: Props) => {
  return (
    <button
      className={'btn me-1 btn-' + color}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
