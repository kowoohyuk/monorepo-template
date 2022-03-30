# woowahan-monorepo-template

> yarn berry의 workspace를 활용한 모노레포 템플릿 프로젝트 입니다.  

## 바로가기

- [기본 모노레포 브랜치](https://github.com/kowoohyuk/monorepo-template/tree/normal)
- [storybook 모노레포 브랜치](https://github.com/kowoohyuk/monorepo-template/tree/storybook)
- [jest 모노레포 브랜치](https://github.com/kowoohyuk/monorepo-template/tree/jest)
- **storybook + jest 모노레포 브랜치**

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
"scripts": {
  "common-components": "yarn workspace @common/components",
  "common-styles": "yarn workspace @common/styles",
  ...
}
```
> 코드 참고: [package.json 10~14 lines](/package.json)

2. 다른 프로젝트의 참조
각 프로젝트는 package.json의 <code>name</code>으로 식별하며, 다른 프로젝트는 아래와 같은 방식으로 해당 프로젝트를 참조하게 됩니다.

```js
"dependencies": {
  "@common/components": "workspace:*",
  "@common/styles": "workspace:*",
  ...
}
```
> 코드 참고: [prototype-a/package.json 11~12 lines](/packages/prototype-a/package.json)

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
> 코드 참고: [eslintrc.js 105~179 lines](/.eslintrc.js)

4. tsconfig 설정

참조할 프로젝트의 경로를 root tsconfig의 references에 설정합니다.  
참조될 개별 프로젝트의 tsconfig에는 composite 및 declartion을 설정합니다.
> 참고: <https://www.typescriptlang.org/docs/handbook/project-references.html>

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
> 코드 참고: [tsconfig.json 16~26 lines](/tsconfig.json)

```js
"compilerOptions": {
  "composite": true,
  "declaration": true,
}
```
> 코드 참고: [common-components/tsconfig.json 7~8 lines](/packages/common-components/tsconfig.json)

5. jest 설정

workspace-tools 플러그인을 설치하면, 전체 프로젝트의 테스트가 편리해집니다! <code>yarn plugin import workspace-tools</code>을 실행해 주세요!
> 참고: <https://yarnpkg.com/cli/workspaces/foreach>

```js
{
  "test:all": "yarn workspaces foreach --parallel run test",
}
```
> 코드 참고: [package.json 16 lines](/package.json)

개별 프로젝트의 jest 설정은 [링크](/packages/common-components)를 참고해 주세요.

## 새로운 프로젝트 추가

1. workspaces 내부에 새로운 폴더를 생성합니다.

2. package.json를 생성합니다.
   - dependencies를 설정합니다.
   - 참조할 프로젝트가 있다면 경로를 dependencies에 추가합니다.
      ```js
        "dependencies": {
          // ...
          "프로젝트명": "workspace:*",
        }
      ```
3. tsconfig.json를 생성합니다.
   - 공통으로 사용하는 tsconfig가 있다면, extends 합니다.
     ```js
     {
       "extends": "../../tsconfig.json",
     }
     ```
4. (필요한 경우) 루트에 위치하는 package.json에 script를 추가합니다.
    ```js
    "scripts": {
        "별칭": "yarn workspace 프로젝트명",
    } // => yarn 별칭 프로젝트scripts
    ```
5. 새로운 프로젝트를 다른 프로젝트가 참조한다면,
    1. 해당 프로젝트의 tsconfig에 composite 및 declartion을 설정합니다.
    2. 참조하는 프로젝트의 dependencies에 해당 프로젝트를 설정합니다.
    3. (필요한 경우) 루트에 위치하는 tsconfig의 references에 경로를 추가합니다.
    ```js
    // 1  
    "references": [
      {
        "path": "프로젝트 경로"
      },
    ]
    // 2
    "compilerOptions": {
      "composite": true,
      "declaration": true,
    }
    // 3
    "dependencies": {
      "프로젝트명": "workspace:*",
    }
    ```
6. eslint 설정 파일의 setting/overrides에 해당 프로젝트를 추가합니다.
    ```js
    {
      files: [
        '프로젝트 경로/**/*.ts?(x)',
        '프로젝트 경로/**/*.js?(x)',
      ],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(
              `${__dirname}/프로젝트 경로/tsconfig.json`
            ),
          },
        },
      },
    },
    ```
7. lint-staged를 사용한다면, 해당 프로젝트를 추가합니다. 
8. yarn install
