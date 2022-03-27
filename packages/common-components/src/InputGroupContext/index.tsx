import { createContext, PropsWithChildren, useContext } from 'react';

export interface InputGroupContextProps {
  disabled?: boolean;
}

const InputGroupContext = createContext<InputGroupContextProps | null>(null);

export const InputGroupProvider = ({
  children,
  ...props
}: PropsWithChildren<InputGroupContextProps>) => (
  <InputGroupContext.Provider value={props}>
    {children}
  </InputGroupContext.Provider>
);

export const useInputGroup = () => useContext(InputGroupContext);
