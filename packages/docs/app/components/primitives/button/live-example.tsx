'use client';
import { Button } from 'component-library';
import { LiveDemoWrapper } from '@/components/live-demo-wrapper/live-demo-wrapper';
import { useState } from 'react';
import { ArrowRightIcon, TrashIcon } from '@/components/icons';

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
    <div className="flex flex-col gap-2">
      <LiveDemoWrapper
        title="Button"
        subtitle="A flexible button component with multiple variants and sizes, supporting all standard HTML button attributes."
        rightSidePanel={
          <RightSidePanel count={count} handleReset={handleReset} />
        }
      >
        <div className="flex flex-col gap-2">
          <Button onClick={handleClick}>Default Button</Button>
          <Button onClick={handleClick} className="bg-blue-500 text-white">
            Custom Styled Button
          </Button>
        </div>
      </LiveDemoWrapper>
      <LiveDemoWrapper
        title="Button with Icons"
        subtitle="A flexible button component with left and right icons."
        rightSidePanel={
          <RightSidePanel count={count} handleReset={handleReset} />
        }
      >
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleClick}
            leftSection={<TrashIcon className="w-4 h-4" />}
          >
            Left Icon
          </Button>
          <Button
            onClick={handleClick}
            rightSection={<ArrowRightIcon className="w-4 h-4" />}
          >
            Right Icon
          </Button>
          <Button onClick={handleClick} loading>
            Loading State
          </Button>
        </div>
      </LiveDemoWrapper>
    </div>
  );
}
