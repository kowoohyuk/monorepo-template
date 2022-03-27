import '@emotion/react';
import { ITheme } from './types';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends ITheme {}
}
