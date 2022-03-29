import { ThemeProvider } from '@emotion/react';
import { DecoratorFn } from '@storybook/react';

import { theme } from '@common/styles';

export const decorators: DecoratorFn[] = [
  Story => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};
