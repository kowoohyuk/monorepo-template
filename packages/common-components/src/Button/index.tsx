import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  useMemo,
} from 'react';

import { css, useTheme } from '@emotion/react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'danger' | 'default';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  text?: string;
  testId?: string;
};

const buttonStyle = css`
  color: inherit;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  &:disabled {
    cursor: default;
  }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = 'button',
      variant = 'contained',
      color = 'primary',
      onClick,
      text,
      disabled = false,
      testId,
      children,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const colors = useMemo(
      () => ({
        primary: theme.palette.hue.mint,
        danger: theme.palette.hue.red,
        default: theme.palette.hue.gray,
      }),
      [theme]
    );

    const baseStyle = css`
      border-radius: 4px;
      letter-spacing: -0.4px;
      transition: 200ms opacity;
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.6;
      }
    `;

    const containedStyle = useMemo(
      () => css`
        color: ${theme.palette.gray.white};
        background-color: ${colors[color]};
      `,
      [theme, colors, color]
    );

    const invertedStyle = useMemo(
      () => css`
        color: ${colors[color]};
        border: ${variant === 'text' ? 0 : 1}px solid currentColor;
        background-color: ${theme.palette.gray.white};
        &:disabled {
          color: ${theme.palette.gray.gray5};
        }
      `,
      [theme, colors, color, variant]
    );

    const invertedPadding = css`
      padding: 7px 9px;
    `;

    return (
      <button
        ref={ref}
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
        css={[
          buttonStyle,
          baseStyle,
          variant === 'contained' ? containedStyle : invertedStyle,
          variant === 'outlined' && invertedPadding,
        ]}
        data-testid={testId}
        {...props}
      >
        {children ?? text}
      </button>
    );
  }
);

export default Button;
