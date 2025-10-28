/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Surface } from './surface';

describe('Surface', () => {
  it('renders as a div element', () => {
    render(<Surface>Content</Surface>);

    const element = screen.getByText('Content');
    expect(element.tagName).toBe('DIV');
  });

  it('renders with text content', () => {
    render(<Surface>Hello World</Surface>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with JSX children', () => {
    render(
      <Surface>
        <p>Paragraph</p>
        <span>Span</span>
      </Surface>
    );

    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Span')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Surface ref={ref}>Content</Surface>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('spreads HTML attributes', () => {
    render(
      <Surface id="surface-id" data-testid="surface" className="custom-class">
        Content
      </Surface>
    );

    const element = screen.getByTestId('surface');
    expect(element).toHaveAttribute('id', 'surface-id');
    expect(element).toHaveClass('custom-class');
  });

  it('applies aria attributes', () => {
    render(
      <Surface aria-label="Container" role="region">
        Content
      </Surface>
    );

    const element = screen.getByRole('region');
    expect(element).toHaveAttribute('aria-label', 'Container');
  });

  it('supports event handlers', () => {
    let clicked = false;
    render(
      <Surface
        onClick={() => {
          clicked = true;
        }}
      >
        Content
      </Surface>
    );

    const element = screen.getByText('Content');
    element.click();
    expect(clicked).toBe(true);
  });

  it('handles empty content', () => {
    const { container } = render(<Surface />);
    const div = container.querySelector('div');

    expect(div).toBeInTheDocument();
    expect(div?.childNodes.length).toBe(0);
  });

  it('has correct displayName', () => {
    expect(Surface.displayName).toBe('Surface');
  });

  it('applies style prop', () => {
    render(
      <Surface data-testid="styled-surface" style={{ backgroundColor: 'red' }}>
        Content
      </Surface>
    );

    const element = screen.getByTestId('styled-surface');
    expect(element).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('handles data attributes', () => {
    render(
      <Surface data-testid="data-surface" data-custom="value">
        Content
      </Surface>
    );

    const element = screen.getByTestId('data-surface');
    expect(element).toHaveAttribute('data-custom', 'value');
  });

  it('ref maintains reference after rerenders', () => {
    const ref = createRef<HTMLDivElement>();
    const { rerender } = render(<Surface ref={ref}>First</Surface>);

    const firstRef = ref.current;
    rerender(<Surface ref={ref}>Second</Surface>);

    expect(ref.current).toBe(firstRef);
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders with nested surfaces', () => {
    render(
      <Surface data-testid="outer">
        <Surface data-testid="inner">Nested</Surface>
      </Surface>
    );

    expect(screen.getByTestId('outer')).toBeInTheDocument();
    expect(screen.getByTestId('inner')).toBeInTheDocument();
    expect(screen.getByText('Nested')).toBeInTheDocument();
  });

  it('allows multiple children', () => {
    render(
      <Surface>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </Surface>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
