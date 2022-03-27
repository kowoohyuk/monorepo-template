import { ThemeProvider } from '@emotion/react';

import { theme } from '@common/styles';

import '@common/styles/src/emotion.d';
import '../font/font.css';
import Card from './Card';

const App = () => (
  <ThemeProvider theme={theme}>
    <Card />
  </ThemeProvider>
);

export default App;
