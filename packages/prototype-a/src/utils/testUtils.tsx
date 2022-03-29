import { FC, ReactElement } from 'react';

import { ThemeProvider } from '@emotion/react';
import { render, RenderOptions } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import { theme } from '@common/styles';

const AllTheProviders: FC = ({ children }) => (
  <HashRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </HashRouter>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queryies'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
