# common-components

공통으로 사용하는 컴포넌트를 담당하는 프로젝트 입니다.

## 개별 프로젝트 jest 설정 참고를 위한 파일 구조

```markdown
- src
   - \*
      - \*.spec.\*
         테스트 파일
- utils
   - testUtils.tsx
      테스트를 위한 렌더링 환경 구축
- jest.config.js
   jest 환경 설정 파일로 mock은 최상위 루트에 설정되어 있습니다.
- jest.setup.ts
   테스트 환경을 위한 모듈을 설정한 파일입니다.
- tsconfig.json
   jest 관련 types 및 include 설정이 포함되어 있습니다.
```

