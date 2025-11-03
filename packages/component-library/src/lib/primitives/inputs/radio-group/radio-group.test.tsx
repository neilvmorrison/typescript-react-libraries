/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef, useState } from 'react';
import { RadioGroup } from './radio-group';

const mockOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

describe('RadioGroup', () => {
  it('renders all options', () => {
    render(<RadioGroup options={mockOptions} />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('renders as radio input elements', () => {
    render(<RadioGroup options={mockOptions} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('type', 'radio');
    });
  });

  it('renders with a label', () => {
    render(<RadioGroup options={mockOptions} label="Select an option" />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<RadioGroup options={mockOptions} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('handles selection change', () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup options={mockOptions} onChange={handleChange} value="" />
    );

    fireEvent.click(screen.getByLabelText('Option 1'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports controlled component with value prop', () => {
    const { rerender } = render(
      <RadioGroup options={mockOptions} value="option1" />
    );
    expect(screen.getByDisplayValue('option1')).toBeChecked();

    rerender(<RadioGroup options={mockOptions} value="option2" />);
    expect(screen.getByDisplayValue('option2')).toBeChecked();
    expect(screen.getByDisplayValue('option1')).not.toBeChecked();
  });

  it('respects disabled state on entire group', () => {
    render(<RadioGroup options={mockOptions} disabled />);
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('respects disabled state on individual options', () => {
    const disabledOptions = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2', disabled: true },
      { label: 'Option 3', value: 'option3' },
    ];
    render(<RadioGroup options={disabledOptions} />);
    expect(screen.getByDisplayValue('option2')).toBeDisabled();
    expect(screen.getByDisplayValue('option1')).not.toBeDisabled();
  });

  it('supports different directions', () => {
    const { container: verticalContainer } = render(
      <RadioGroup options={mockOptions} direction="vertical" />
    );
    expect(
      verticalContainer.querySelector('.radio-group-vertical')
    ).toBeInTheDocument();

    const { container: horizontalContainer } = render(
      <RadioGroup options={mockOptions} direction="horizontal" />
    );
    expect(
      horizontalContainer.querySelector('.radio-group-horizontal')
    ).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const { container: smallContainer } = render(
      <RadioGroup options={mockOptions} size="sm" />
    );
    expect(smallContainer.querySelector('.radio-group-sm')).toBeInTheDocument();

    const { container: largeContainer } = render(
      <RadioGroup options={mockOptions} size="lg" />
    );
    expect(largeContainer.querySelector('.radio-group-lg')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<RadioGroup options={mockOptions} ref={ref} value="option1" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('radio');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <RadioGroup
        options={mockOptions}
        data-testid="custom-radio"
        aria-label="test radio group"
      />
    );

    expect(screen.getAllByRole('radio')[0]).toHaveAttribute(
      'aria-label',
      'test radio group'
    );
  });

  it('accepts custom className', () => {
    const { container } = render(
      <RadioGroup options={mockOptions} className="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(RadioGroup.displayName).toBe('RadioGroup');
  });

  it('works as a controlled component with useState', () => {
    const ControlledComponent = () => {
      const [value, setValue] = useState('option1');
      return (
        <RadioGroup
          options={mockOptions}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      );
    };

    render(<ControlledComponent />);
    expect(screen.getByDisplayValue('option1')).toBeChecked();

    fireEvent.click(screen.getByLabelText('Option 2'));
    expect(screen.getByDisplayValue('option2')).toBeChecked();
  });
});
