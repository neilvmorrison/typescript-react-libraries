import { ReactElement } from 'react';
import { Size } from '../types/index';
import styles from './icon.module.css';

export interface IIconProps {
  icon: ReactElement;
  size?: Size;
  color?: string;
  className?: string;
}

export const Icon = ({
  icon,
  size = 'md',
  color,
  className,
}: IIconProps): React.JSX.Element => {
  const iconClasses = [styles.icon, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={iconClasses} style={{ color }}>
      {icon}
    </span>
  );
};
