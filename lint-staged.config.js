// 프로젝트의 변동이 있을 때, 해당 파일에서 lint-staged를 수정하게 됩니다.
module.exports = {
  '*.+(ts|tsx)': [() => 'yarn tsc -p tsconfig.json --noEmit'],
  'packages/common-components/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/common-components/tsconfig.json --noEmit',
  ],
  'packages/common-styles/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/common-styles/tsconfig.json --noEmit',
  ],
  'packages/prototype-a/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/prototype-a/tsconfig.json --noEmit',
  ],
  'packages/prototype-b/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/prototype-b/tsconfig.json --noEmit',
  ],
  '**/*.+(ts|tsx|js|jsx)': ['eslint --fix --cache', 'prettier --write'],
};
