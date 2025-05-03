import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface RTLIconProps {
  children: React.ReactNode;
  className?: string;
}

export const RTLIcon: React.FC<RTLIconProps> = ({ children, className }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <span className={clsx(
      className,
      'inline-flex',
      isRTL && 'rotate-180'
    )}>
      {children}
    </span>
  );
};