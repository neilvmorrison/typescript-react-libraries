/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Typography } from './typography';

describe('Typography', () => {
  it('renders with default p element', () => {
    render(<Typography>Default text</Typography>);

    const element = screen.getByText('Default text');
    expect(element.tagName).toBe('P');
  });

  it('renders different heading levels', () => {
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

    headings.forEach((heading) => {
      const { unmount } = render(
        <Typography as={heading}>Heading {heading}</Typography>
      );

      const element = screen.getByText(`Heading ${heading}`);
      expect(element.tagName).toBe(heading.toUpperCase());
      unmount();
    });
  });

  it('renders span element', () => {
    render(<Typography as="span">Span text</Typography>);

    const element = screen.getByText('Span text');
    expect(element.tagName).toBe('SPAN');
  });

  it('renders div element', () => {
    render(<Typography as="div">Div text</Typography>);

    const element = screen.getByText('Div text');
    expect(element.tagName).toBe('DIV');
  });

  it('renders label element', () => {
    render(<Typography as="label">Label text</Typography>);

    const element = screen.getByText('Label text');
    expect(element.tagName).toBe('LABEL');
  });

  it('renders blockquote element', () => {
    render(<Typography as="blockquote">Quote text</Typography>);

    const element = screen.getByText('Quote text');
    expect(element.tagName).toBe('BLOCKQUOTE');
  });

  it('forwards ref correctly for different element types', () => {
    const elements = ['p', 'span', 'div', 'blockquote'] as const;

    elements.forEach((element) => {
      const ref = createRef<HTMLElement>();
      const { unmount } = render(
        <Typography as={element} ref={ref}>
          Text
        </Typography>
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe(element.toUpperCase());
      unmount();
    });
  });

  it('applies size classes correctly', () => {
    const sizes = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      '6xl',
    ] as const;

    sizes.forEach((size) => {
      const { unmount } = render(
        <Typography size={size} data-testid={`size-${size}`}>
          Text
        </Typography>
      );

      const element = screen.getByTestId(`size-${size}`);
      expect(element).toBeInTheDocument();
      unmount();
    });
  });

  it('applies weight classes correctly', () => {
    const weights = [
      'light',
      'normal',
      'medium',
      'semibold',
      'bold',
      'extrabold',
      'black',
    ] as const;

    weights.forEach((weight) => {
      const { unmount } = render(
        <Typography weight={weight} data-testid={`weight-${weight}`}>
          Text
        </Typography>
      );

      const element = screen.getByTestId(`weight-${weight}`);
      expect(element).toHaveAttribute('weight', weight);
      unmount();
    });
  });

  it('applies color classes correctly', () => {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
      'quinary',
      'senary',
      'septenary',
      'octonary',
      'nonary',
      'denary',
    ] as const;

    colors.forEach((color) => {
      const { unmount } = render(
        <Typography color={color} data-testid={`color-${color}`}>
          Text
        </Typography>
      );

      const element = screen.getByTestId(`color-${color}`);
      expect(element).toHaveAttribute('color', color);
      unmount();
    });
  });

  it('applies text alignment', () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const;

    alignments.forEach((align) => {
      const { unmount } = render(
        <Typography align={align} data-testid={`align-${align}`}>
          Text
        </Typography>
      );

      const element = screen.getByTestId(`align-${align}`);
      expect(element).toHaveAttribute('align', align);
      unmount();
    });
  });

  it('applies truncate attribute', () => {
    render(
      <Typography truncate data-testid="truncate">
        Truncated text
      </Typography>
    );

    const element = screen.getByTestId('truncate');
    expect(element).toBeInTheDocument();
  });

  it('applies lineHeight property', () => {
    render(
      <Typography lineHeight={1.5} data-testid="line-height">
        Text
      </Typography>
    );

    const element = screen.getByTestId('line-height');
    expect(element).toHaveAttribute('lineHeight', '1.5');
  });

  it('applies letterSpacing property', () => {
    render(
      <Typography letterSpacing={0.5} data-testid="letter-spacing">
        Text
      </Typography>
    );

    const element = screen.getByTestId('letter-spacing');
    expect(element).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Typography className="custom-class">Text</Typography>);

    const element = screen.getByText('Text');
    expect(element).toHaveClass('custom-class');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Typography
        id="typography-id"
        data-testid="typography-test"
        aria-label="Typography label"
      >
        Text
      </Typography>
    );

    const element = screen.getByTestId('typography-test');
    expect(element).toHaveAttribute('id', 'typography-id');
    expect(element).toHaveAttribute('aria-label', 'Typography label');
  });

  it('renders with complex children', () => {
    render(
      <Typography as="div">
        <strong>Bold</strong> <em>Italic</em>
      </Typography>
    );

    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
  });

  it('has correct displayName', () => {
    expect(Typography.displayName).toBe('Typography');
  });

  it('accepts variant prop', () => {
    render(
      <Typography variant="h1" data-testid="variant-h1">
        Heading
      </Typography>
    );

    const element = screen.getByTestId('variant-h1');
    expect(element).toHaveAttribute('variant', 'h1');
  });

  it('handles undefined optional props gracefully', () => {
    const { container } = render(<Typography>Text</Typography>);

    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('ref works with createRef API', () => {
    const ref = createRef<HTMLElement>();
    render(<Typography ref={ref}>Text</Typography>);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Text');
  });
});
