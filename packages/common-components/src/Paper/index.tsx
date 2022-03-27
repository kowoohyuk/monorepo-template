import { forwardRef, PropsWithChildren } from 'react';

import { css, useTheme } from '@emotion/react';

export interface PaperProps {
  className?: string;
  disablePadding?: boolean;
  square?: boolean;
  shadow?: boolean;
}

const Paper = forwardRef<HTMLDivElement, PropsWithChildren<PaperProps>>(
  (
    {
      className,
      disablePadding = false,
      square = false,
      shadow = false,
      children,
    },
    ref
  ) => {
    const theme = useTheme();

    const paperStyle = css`
      background-color: ${theme.palette.gray.white};
      padding: ${disablePadding ? '0' : '16px 12px'};
      border: 1px solid ${theme.palette.gray.gray5};
      border-radius: ${square ? '0' : '4px'};
      box-shadow: ${shadow ? '0 2px 4px 0 rgba(0, 0, 0, 0.1)' : 'none'};
    `;

    return (
      <div ref={ref} css={paperStyle} className={className}>
        {children}
      </div>
    );
  }
);

export default Paper;
