'use client';
import { Button } from 'component-library';
import styles from './styles.module.css';

export function LiveExample() {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <div className={styles['button-container']}>
      <Button onClick={handleClick} className={styles['button-style']}>
        Default Button
      </Button>
      <Button variant="primary" onClick={handleClick}>
        Primary Button
      </Button>
      <Button variant="danger" size="lg" onClick={handleClick}>
        Delete
      </Button>
    </div>
  );
}
