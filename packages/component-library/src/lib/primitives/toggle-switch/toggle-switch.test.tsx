/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { ToggleSwitch } from './toggle-switch';

describe('ToggleSwitch', () => {
  it('renders as a checkbox input', () => {
    render(<ToggleSwitch />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with switch track', () => {
    const { container } = render(<ToggleSwitch />);
    const track = container.querySelector('.switch-track');
    expect(track).toBeInTheDocument();
  });

  it('renders with switch thumb', () => {
    const { container } = render(<ToggleSwitch />);
    const thumb = container.querySelector('.switch-thumb');
    expect(thumb).toBeInTheDocument();
  });

  describe('size prop', () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`applies switch-${size} class for size "${size}"`, () => {
        const { container } = render(<ToggleSwitch size={size} />);
        const track = container.querySelector('.switch-track');
        expect(track).toHaveClass(`switch-${size}`);
      });
    });
  });

  it('defaults to md size', () => {
    const { container } = render(<ToggleSwitch />);
    const track = container.querySelector('.switch-track');
    expect(track).toHaveClass('switch-md');
  });

  it('renders label when provided', () => {
    render(<ToggleSwitch label="Enable feature" />);
    expect(screen.getByText('Enable feature')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<ToggleSwitch label="Toggle me" />);
    const label = screen.getByText('Toggle me');
    const input = screen.getByRole('checkbox');

    expect(label).toHaveAttribute('for', input.id);
  });

  it('toggles checked state on click', () => {
    render(<ToggleSwitch />);
    const input = screen.getByRole('checkbox');

    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(input.checked).toBe(true);
  });

  it('handles onChange event', () => {
    const onChange = vi.fn();
    render(<ToggleSwitch onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('supports disabled state', () => {
    render(<ToggleSwitch disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<ToggleSwitch ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('checkbox');
  });

  it('spreads additional HTML attributes', () => {
    render(<ToggleSwitch data-testid="toggle" aria-label="toggle switch" />);
    const input = screen.getByTestId('toggle');

    expect(input).toHaveAttribute('aria-label', 'toggle switch');
  });

  it('has correct displayName', () => {
    expect(ToggleSwitch.displayName).toBe('ToggleSwitch');
  });

  it('accepts custom className', () => {
    const { container } = render(<ToggleSwitch className="custom-class" />);
    const track = container.querySelector('.switch-track');

    expect(track).toHaveClass('custom-class');
  });

  it('combines default classes with custom className', () => {
    const { container } = render(
      <ToggleSwitch size="lg" className="custom-switch" />
    );
    const track = container.querySelector('.switch-track');

    expect(track).toHaveClass('switch-track');
    expect(track).toHaveClass('switch-lg');
    expect(track).toHaveClass('custom-switch');
  });

  it('generates unique id for each instance', () => {
    const { container: container1 } = render(<ToggleSwitch label="First" />);
    const { container: container2 } = render(<ToggleSwitch label="Second" />);

    const input1 = container1.querySelector('input');
    const input2 = container2.querySelector('input');
    const label1 = container1.querySelector('label');
    const label2 = container2.querySelector('label');

    expect(input1?.id).not.toBe(input2?.id);
    expect(label1?.getAttribute('for')).toBe(input1?.id);
    expect(label2?.getAttribute('for')).toBe(input2?.id);
  });

  it('can be controlled with defaultChecked', () => {
    render(<ToggleSwitch defaultChecked />);
    const input = screen.getByRole('checkbox');

    expect(input).toBeChecked();
  });
});
