'use client';
import { RadioGroup, ToggleSwitch } from 'component-library';
import { LiveDemoWrapper } from '@/components/live-demo-wrapper/live-demo-wrapper';
import { useState } from 'react';

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];

const sizeOptions = [
  { label: 'Small', value: 'small' },
  { label: 'Medium', value: 'medium' },
  { label: 'Large', value: 'large' },
];

export function LiveExample() {
  const [selectedFruit, setSelectedFruit] = useState('apple');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [isDisabled, setIsDisabled] = useState(false);
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>(
    'vertical'
  );
  const [showError, setShowError] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <LiveDemoWrapper
        title="Basic RadioGroup"
        subtitle="A simple radio group component with a label."
      >
        <div className="flex flex-col gap-4">
          <RadioGroup
            options={fruitOptions}
            label="Select your favorite fruit"
            value={selectedFruit}
            onChange={(e) => setSelectedFruit(e.currentTarget.value)}
          />
          <p className="text-sm text-slate-600">
            Selected: <span className="font-semibold">{selectedFruit}</span>
          </p>
        </div>
      </LiveDemoWrapper>

      <LiveDemoWrapper
        title="RadioGroup Directions & States"
        subtitle="Toggle between vertical and horizontal layouts with disabled and error states."
        rightSidePanel={
          <div className="flex flex-col gap-3">
            <ToggleSwitch
              label="Disabled"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
            <ToggleSwitch
              label="Show Error"
              checked={showError}
              onChange={(e) => setShowError(e.target.checked)}
            />
            <div>
              <label className="text-sm font-medium mb-2 block">
                Direction
              </label>
              <select
                value={direction}
                onChange={(e) =>
                  setDirection(e.target.value as 'vertical' | 'horizontal')
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <RadioGroup
            options={sizeOptions}
            label="Choose a size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.currentTarget.value)}
            disabled={isDisabled}
            direction={direction}
            error={showError ? 'This field is required' : undefined}
          />
          <p className="text-sm text-slate-600">
            Selected: <span className="font-semibold">{selectedSize}</span>
          </p>
        </div>
      </LiveDemoWrapper>

      <LiveDemoWrapper
        title="RadioGroup Sizes"
        subtitle="RadioGroup supports different sizes: sm, md, and lg."
      >
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium mb-2">Small</p>
            <RadioGroup
              options={fruitOptions}
              size="sm"
              value={selectedFruit}
              onChange={(e) => setSelectedFruit(e.currentTarget.value)}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Medium</p>
            <RadioGroup
              options={fruitOptions}
              size="md"
              value={selectedFruit}
              onChange={(e) => setSelectedFruit(e.currentTarget.value)}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Large</p>
            <RadioGroup
              options={fruitOptions}
              size="lg"
              value={selectedFruit}
              onChange={(e) => setSelectedFruit(e.currentTarget.value)}
            />
          </div>
        </div>
      </LiveDemoWrapper>

      <LiveDemoWrapper
        title="Disabled Options"
        subtitle="Individual options can be disabled independently."
      >
        <RadioGroup
          options={[
            { label: 'Enabled Option', value: 'enabled' },
            { label: 'Disabled Option', value: 'disabled', disabled: true },
            { label: 'Another Enabled', value: 'enabled2' },
          ]}
          label="Select an option"
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.currentTarget.value)}
        />
      </LiveDemoWrapper>
    </div>
  );
}
