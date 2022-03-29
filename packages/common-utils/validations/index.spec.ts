import {
  isValidTimeFormat,
  isValidDateFormat,
  isNumeric,
  isAlphabet,
  isAlphaNumeric,
  isKorean,
} from '.';

describe('validations utils', () => {
  it('isValidTimeFormat, string 타입의 날짜가 [HH:mm:ss] 또는 [HH:mm] 형식인지 검사할 수 있다.', () => {
    expect(isValidTimeFormat('22:22:22')).toEqual(true);
    expect(isValidTimeFormat('22:22')).toEqual(true);
    expect(isValidTimeFormat('2022-02-22')).toEqual(false);
    expect(isValidTimeFormat('2022-02-22 02:')).toEqual(false);
  });

  it('isValidDateFormat, string 타입의 날짜가 [yyyy-MM-dd] 또는 [yyyy-MM-dd HH:mm:ss] 형식인지 검사할 수 있다.', () => {
    expect(isValidDateFormat('2022-02-22')).toEqual(true);
    expect(isValidDateFormat('2022-02-22 22:22:22')).toEqual(true);
    expect(isValidDateFormat('2022-02-22 22:22')).toEqual(false);
    expect(isValidDateFormat('2022-02-22T22:22:22.000Z')).toEqual(false);
  });

  it('isNumeric, 주어진 string이 숫자만 포함되어 있는지 검사할 수 있다.', () => {
    expect(isNumeric('010')).toEqual(true);
    expect(isNumeric('abc')).toEqual(false);
    expect(isNumeric('abc0')).toEqual(false);
    expect(isNumeric('0가나다')).toEqual(false);
  });

  it('isAlphabet, 주어진 string이 영문만 포함되어 있는지 검사할 수 있다.', () => {
    expect(isAlphabet('woowahan')).toEqual(true);
    expect(isAlphabet('ABa')).toEqual(true);
    expect(isAlphabet('A+')).toEqual(false);
    expect(isAlphabet('가나다')).toEqual(false);
  });

  it('isAlphaNumeric, 주어진 string이 영문이나 숫자만 포함되어 있는지 검사할 수 있다.', () => {
    expect(isAlphaNumeric('woowahan')).toEqual(true);
    expect(isAlphaNumeric('A0')).toEqual(true);
    expect(isAlphaNumeric('A-B')).toEqual(false);
    expect(isAlphaNumeric('가나다1')).toEqual(false);
  });

  it('isKorean, 주어진 string이 한글만 포함되어 있는지 검사할 수 있다.', () => {
    expect(isKorean('우아한형제들')).toEqual(true);
    expect(isKorean('010')).toEqual(false);
    expect(isKorean('A')).toEqual(false);
    expect(isKorean('가나다1')).toEqual(false);
  });
});
