'use client';
import { Button } from 'component-library';
import { LiveDemoWrapper } from '@/components/live-demo-wrapper/live-demo-wrapper';
import { useState } from 'react';

const RightSidePanel = ({
  count,
  handleReset,
}: {
  count: number;
  handleReset: () => void;
}) => {
  return (
    <div>
      <p>Button clicked {count} times</p>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
};

export function LiveExample() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <LiveDemoWrapper
      title="Button"
      subtitle="A flexible button component with multiple variants and sizes, supporting all standard HTML button attributes."
      rightSidePanel={
        <RightSidePanel count={count} handleReset={handleReset} />
      }
    >
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleClick}
          className="content-fit bg-[#FF4a55] text-white"
        >
          Default Button
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Primary Button
        </Button>
        <Button variant="danger" size="lg" onClick={handleClick}>
          Delete
        </Button>
      </div>
    </LiveDemoWrapper>
  );
}
