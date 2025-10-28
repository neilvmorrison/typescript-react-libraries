'use client';
import { Button } from 'component-library';
import styles from './styles.module.css';
export function LiveExample() {
  const handleClick = () => {
    alert('Button clicked');
  };
  return (
    <div className={styles['button-container']}>
      <Button onClick={handleClick}>Default Button</Button>
      <Button variant="primary" onClick={handleClick}>
        Primary Button
      </Button>
      <Button variant="danger" size="lg" onClick={handleClick}>
        Delete
      </Button>
    </div>
  );
}
