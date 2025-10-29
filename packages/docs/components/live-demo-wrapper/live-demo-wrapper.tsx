'use client';

import { Button, ToggleSwitch } from 'component-library';
import { CopyIcon } from 'nextra/icons';
import { ReactNode } from 'react';

export interface ILiveDemoWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  rightSidePanel?: ReactNode;
  leftSidePanel?: ReactNode;
}

const LiveDemoWrapperContent = ({ children }: { children: ReactNode }) => {
  return <div className="w-full p-4">{children}</div>;
};

const LiveDemoWrapperSidePanel = ({ children }: { children: ReactNode }) => {
  return <div className="min-w-64 bg-gray-100 p-4">{children}</div>;
};

export const LiveDemoWrapper = ({
  children,
  title,
  rightSidePanel,
  leftSidePanel,
  subtitle,
}: ILiveDemoWrapperProps) => {
  return (
    <div className="border border-gray-200 rounded-md my-4">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            <ToggleSwitch
              size="sm"
              uncheckedText="Show Code"
              checkedText="Hide Code"
              className="min-w-36"
            />
            <Button variant="secondary" size="sm">
              <CopyIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex">
        {leftSidePanel && (
          <LiveDemoWrapperSidePanel>{leftSidePanel}</LiveDemoWrapperSidePanel>
        )}
        <LiveDemoWrapperContent>{children}</LiveDemoWrapperContent>
        {rightSidePanel && (
          <LiveDemoWrapperSidePanel>{rightSidePanel}</LiveDemoWrapperSidePanel>
        )}
      </div>
    </div>
  );
};
