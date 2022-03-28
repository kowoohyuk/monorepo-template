# woowahan-monorepo-template

storybook을 적용한 모노레포입니다.  
## 시작하기

1. yarn이 설치되어 있지 않다면 <code>npm install -g yarn</code>을 우선 실행해 주세요. 
   > MacOS이며, brew가 설치되어 있다면 <code>brew install yarn</code>도 가능합니다!

2. eslint의 정상적인 사용을 위해 <code>yarn</code>을 통해 core-js 모듈 빌드가 필요합니다.

3. **VisualStudio Code** 사용 시 PnP를 정상적으로 적용하기 위해서 <code>yarn dlx @yarnpkg/sdks vscode</code>를 실행해 주세요!  
   > 참고: <https://yarnpkg.com/getting-started/editor-sdks#vscode>
## 파일 구조

```markdown
- /.husky
  husky 라이브러리 관련 코드가 위치하며, pre-commit을 수행합니다.

- /packages
  프로젝트들이 위치하는 디렉터리 입니다.
  package.json의 workspaces를 통해 경로로 지정됩니다.
  - common-components
    공통으로 사용하는 컴포넌트를 담당하는 프로젝트 입니다.
  - hooks
    공통으로 사용하는 스타일을 담당하는 프로젝트 입니다.
  - prototype-a
    개별적인 프로젝트 입니다.
  - prototype-b
    개별적인 프로젝트 입니다.

- .eslintrc.js
  lint의 설정은 동일하기 때문에 개별 프로젝트에서는 lint 설정이 존재하지 않습니다.  
  따라서 lint 통합 설정 파일이 됩니다.

- .prettierrc.json
  prettier 통합 설정 파일, lint와 같이 prettier의 설정도 동일합니다.  
  lint와 마찬가지로 개별 프로젝트에는 prettier 설정이 존재하지 않습니다.

- lint-staged.config.js
  lint-staged 설정입니다.

- monorepo-template.code-workspace
  [multi-root workspaces](https://code.visualstudio.com/docs/editor/multi-root-workspaces)를 위한 파일입니다.

- tsconfig.json
  공통적으로 적용되는 타입스크립트 세팅을 개별 프로젝트에서 import하여 사용합니다.
```

### 참고사항

1. 개별 프로젝트의 스크립트 실행
프로젝트의 스크립트는 <code>yarn workspace 프로젝트명 스크립트</code>를 통해 실행하게 됩니다.

```js
"dependencies": {
  "@common/components": "workspace:*",
  "@common/styles": "workspace:*",
  ...
}
```
> 참고: [package.json 9~13 lines](/package.json)


2. 다른 프로젝트의 참조
각 프로젝트는 package.json의 <code>name</code>으로 식별하며, 다른 프로젝트는 아래와 같은 방식으로 참조하게 됩니다.

```js
"dependencies": {
  "@common/components": "workspace:*",
  "@common/styles": "workspace:*",
  ...
}
```
> 참고: [prototype-a/package.json 10~11 lines](/packages/prototype-a/package.json)

3. eslint 설정

각 프로젝트별 tsconfig.json 설정을 따르기 위해 setting/overriders에 프로젝트별 설정이 필요합니다.

```js
{
  files: [
    'packages/디렉토리명/**/*.ts?(x)',
    'packages/디렉토리명/**/*.js?(x)',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(
          // tsconfig.json 경로
        ),
      },
    },
  },
},
```
> 참고: [eslintrc.js 86~145 lines](/.eslintrc.js)

4. tsconfig 설정

참조할 프로젝트에 대한 root 경로의 references 설정이 필요합니다.  
이후 개별 프로젝트의 tsconfig에서 composite 설정을 하게 됩니다.

```js
"references": [
  {
    "path": "packages/common-components"
  },
  {
    "path": "packages/common-styles"
  },
],
```
> 참고: [tsconfig.json 16~23 lines](/tsconfig.json)

```js
"composite": true,
```
> 참고: [prototype-a/tsconfig.json 9 lines](/packages/prototype-a/tsconfig.json)

