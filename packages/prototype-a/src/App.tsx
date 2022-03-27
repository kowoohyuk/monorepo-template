import { css, ThemeProvider } from '@emotion/react';

import { Link, Paper } from '@common/components';
import { colors, theme } from '@common/styles';

import serviceVision from './service-vision.jpeg';

import '@common/styles/src/emotion.d';

const SERVICE_VISION = '문 앞으로 배달되는 일상의 행복';

const App = () => {
  const styles = css`
    display: flex;
    flex-flow: column;
    margin: 5vh auto;
    padding: 16px;
    text-align: center;
    width: fit-content;
    .service-vision {
      width: 20vw;
    }
    > a {
      background-color: ${colors.white};
      color: ${colors.mint[300]};
      font-weight: ${theme.palette.fontWeight.bold};
      padding: 10px;
      &:not(last-of-type) {
        margin-bottom: 16px;
      }
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <Paper css={styles}>
        <Link href="https://www.woowahan.com/company/culture#%EC%9A%B0%EC%95%84%ED%95%9C%20%EB%B9%84%EC%A0%84">
          <img
            className="service-vision"
            src={serviceVision}
            alt={SERVICE_VISION}
          />
        </Link>
        <Link underline="hover" href="https://woowahan.com">
          우아한닷컴 바로가기
        </Link>
        <Link underline="hover" href="https://techblog.woowahan.com/">
          우아한형제들 기술블로그 바로가기
        </Link>
        <Link underline="hover" href="https://www.baeminriders.kr/">
          배민라이더스 바로가기
        </Link>
        <Link underline="hover" href="https://www.baeminriders.kr/connect">
          배민커넥트 바로가기
        </Link>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
