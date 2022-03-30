import { setValue, getValue, removeValue } from './storage';

/* eslint-disable no-proto */
jest.spyOn(window.localStorage.__proto__, 'setItem');
jest.spyOn(window.localStorage.__proto__, 'getItem');
jest.spyOn(window.localStorage.__proto__, 'removeItem');

jest.spyOn(window.sessionStorage.__proto__, 'setItem');
jest.spyOn(window.sessionStorage.__proto__, 'getItem');
jest.spyOn(window.sessionStorage.__proto__, 'removeItem');

const KEY = 'projectName';
const VALUE = 'common-utils';

describe('storage utils', () => {
  afterEach(() => jest.resetAllMocks());

  it('local storage에 key-value 형태로 데이터를 저장할 수 있다', () => {
    const useLocalStorage = true;
    setValue<string>(KEY, VALUE, useLocalStorage);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('session storage에 key-value 형태로 데이터를 저장할 수 있다', () => {
    const useLocalStorage = false;
    setValue<string>(KEY, VALUE, useLocalStorage);
    expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('브라우저 storage에 저장되어 있는 데이터를 불러올 수 있다', () => {
    getValue<string>(KEY);
    expect(sessionStorage.getItem).toHaveBeenCalledWith(KEY);
    expect(localStorage.getItem).toHaveBeenCalledWith(KEY);
  });

  it('local storage에 저장되어 있는 데이터를 삭제할 수 있다', () => {
    const useLocalStorage = true;
    removeValue(KEY, useLocalStorage);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });

  it('session storage에 저장되어 있는 데이터를 삭제할 수 있다', () => {
    const useLocalStorage = false;
    removeValue(KEY, useLocalStorage);
    expect(sessionStorage.removeItem).toHaveBeenCalledTimes(1);
  });
});
