import { parse, isValid } from 'date-fns';

export const isValidTimeFormat = (value: string) =>
  isValid(parse(value, 'HH:mm:ss', new Date())) ||
  isValid(parse(value, 'HH:mm', new Date()));

export const isValidDateFormat = (value: string) =>
  isValid(parse(value, 'yyyy-MM-dd', new Date())) ||
  isValid(parse(value, 'yyyy-MM-dd HH:mm:ss', new Date()));

export const isNumeric = (value: string) => /^[0-9]*$/.test(value);

export const isAlphabet = (value: string) => /^[a-zA-Z]*$/.test(value);

export const isAlphaNumeric = (value: string) => /^[a-zA-Z0-9]*$/.test(value);

export const isKorean = (value: string) => /^[가-힣]*$/.test(value);
