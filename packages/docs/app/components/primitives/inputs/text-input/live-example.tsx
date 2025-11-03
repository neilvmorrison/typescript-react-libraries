'use client';
import { TextInput, ToggleSwitch } from 'component-library';
import { LiveDemoWrapper } from '@/components/live-demo-wrapper/live-demo-wrapper';
import { useState } from 'react';

export function LiveExample() {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputType, setInputType] = useState<'text' | 'email' | 'password'>(
    'text'
  );

  return (
    <div className="flex flex-col gap-2">
      <LiveDemoWrapper
        title="Basic TextInput"
        subtitle="A simple text input component with placeholder."
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <TextInput
            placeholder="Enter your name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <p className="text-sm text-slate-600">
            Input value: <span className="font-semibold">{value || '(empty)'}</span>
          </p>
        </div>
      </LiveDemoWrapper>

      <LiveDemoWrapper
        title="TextInput with Disabled State"
        subtitle="Toggle the disabled state to see how the input responds."
        rightSidePanel={
          <div className="flex flex-col gap-3">
            <ToggleSwitch
              label="Disabled"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <TextInput
            placeholder="Enter username"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isDisabled}
          />
        </div>
      </LiveDemoWrapper>

      <LiveDemoWrapper
        title="Input Types"
        subtitle="TextInput supports various HTML input types."
        rightSidePanel={
          <div>
            <label className="text-sm font-medium mb-2 block">Input Type</label>
            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value as 'text' | 'email' | 'password')}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>
          </div>
        }
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <TextInput
            type={inputType}
            placeholder={`Enter your ${inputType}...`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </LiveDemoWrapper>

      <LiveDemoWrapper
        title="With Placeholder"
        subtitle="Helpful placeholder text guides user input."
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <TextInput
            type="email"
            placeholder="you@example.com"
          />
          <TextInput
            type="password"
            placeholder="••••••••"
          />
        </div>
      </LiveDemoWrapper>
    </div>
  );
}
