'use client';
import { Button, ToggleSwitch } from 'component-library';
import { LiveDemoWrapper } from '@/components/live-demo-wrapper/live-demo-wrapper';
import { useState } from 'react';
import { ArrowRightIcon, TrashIcon } from '@/components/icons';

export function LiveExample() {
  const [count, setCount] = useState(0);
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const getDecorationType = () => {
    let type = '';
    if (showLeft && showRight) {
      type = 'left and right icons';
    } else if (showLeft) {
      type = 'left icon';
    } else if (showRight) {
      type = 'right icon';
    } else {
      type = 'no decorations';
    }
    return loading ? type + ' and loading state' : type;
  };

  return (
    <div className="flex flex-col gap-2">
      <LiveDemoWrapper
        title="DefaultButton"
        subtitle="The default button component."
        rightSidePanel={
          <div>
            <p className="mb-2">Button clicked {count} times</p>
            <Button onClick={handleReset} className="bg-slate-200">
              Reset
            </Button>
          </div>
        }
      >
        <div className="flex flex-col gap-2">
          <Button onClick={handleClick}>Default Button</Button>
        </div>
      </LiveDemoWrapper>
      <LiveDemoWrapper
        title="Button with Decorations"
        subtitle="The button supports left and right sections and has a built-in loading state."
        rightSidePanel={
          <div className="flex flex-col gap-2">
            <ToggleSwitch
              label="Show Left Section"
              checked={showLeft}
              onChange={(e) => setShowLeft(e.target.checked)}
            />
            <ToggleSwitch
              label="Show Right Section"
              checked={showRight}
              onChange={(e) => setShowRight(e.target.checked)}
            />
            <ToggleSwitch
              label="Loading"
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
            />
          </div>
        }
      >
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleClick}
            leftSection={
              showLeft ? <TrashIcon className="w-4 h-4" /> : undefined
            }
            rightSection={
              showRight ? <ArrowRightIcon className="w-4 h-4" /> : undefined
            }
            loading={loading}
          >
            Button with {getDecorationType()}
          </Button>
        </div>
      </LiveDemoWrapper>
    </div>
  );
}
