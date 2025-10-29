/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { LoadingSpinner } from './loading-spinner';

describe('LoadingSpinner', () => {
  it('renders as an SVG element', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with the spinner class', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('spinner');
  });

  describe('size prop', () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    sizes.forEach((size) => {
      it(`applies spinner-${size} class for size "${size}"`, () => {
        const { container } = render(<LoadingSpinner size={size} />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass(`spinner-${size}`);
      });
    });
  });

  it('defaults to md size', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('spinner-md');
  });

  it('accepts custom color prop', () => {
    const { container } = render(<LoadingSpinner color="#ff0000" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', '#ff0000');
  });

  it('uses currentColor as default color', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<SVGSVGElement>();
    render(<LoadingSpinner ref={ref} />);

    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(ref.current?.tagName).toBe('svg');
  });

  it('spreads additional SVG attributes', () => {
    const { container } = render(
      <LoadingSpinner data-testid="spinner" aria-label="loading" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-testid', 'spinner');
    expect(svg).toHaveAttribute('aria-label', 'loading');
  });

  it('has correct viewBox for SVG', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('contains a circle element with correct stroke dash array', () => {
    const { container } = render(<LoadingSpinner />);
    const circle = container.querySelector('circle');
    expect(circle).toHaveAttribute('stroke-dasharray', '16 47');
  });

  it('has correct displayName', () => {
    expect(LoadingSpinner.displayName).toBe('LoadingSpinner');
  });

  it('accepts custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-spinner" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-spinner');
  });

  it('combines default classes with custom className', () => {
    const { container } = render(
      <LoadingSpinner size="lg" className="custom-class" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('spinner');
    expect(svg).toHaveClass('spinner-lg');
    expect(svg).toHaveClass('custom-class');
  });

  it('has correct stroke properties for SVG rendering', () => {
    const { container } = render(<LoadingSpinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke-width', '2');
    expect(svg).toHaveAttribute('stroke-linecap', 'round');
    expect(svg).toHaveAttribute('stroke-linejoin', 'round');
  });
});
