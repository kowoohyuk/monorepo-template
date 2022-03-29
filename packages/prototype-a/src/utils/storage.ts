// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setValue = (key: string, value: any, local?: boolean) => {
  const stringified = JSON.stringify(value);
  if (local) {
    localStorage.setItem(key, stringified);
  } else {
    sessionStorage.setItem(key, stringified);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValue = <T = any>(key: string) => {
  const value = sessionStorage.getItem(key) ?? localStorage.getItem(key);
  if (value) {
    return JSON.parse(value) as T;
  }
  return undefined;
};

export const removeValue = (key: string, local?: boolean) => {
  if (local) {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};
