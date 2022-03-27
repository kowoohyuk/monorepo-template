import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useMemo,
} from 'react';

import { css, useTheme } from '@emotion/react';

import { colors } from '@common/styles';

import { useInputGroup } from '../InputGroupContext';

import chevronDown from './ic-expand-down.png';

export interface SelectProps {
  className?: string;
  variant?: 'outlined' | 'text';
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  labelBind?: string;
  valueBind?: string;
  options?: ({ [key: string]: unknown } | number | string)[];
  testId?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options = [],
      variant = 'outlined',
      disabled,
      placeholder,
      required,
      labelBind = 'label',
      valueBind = 'value',
      defaultValue = '',
      testId,
      ...selectProps
    },
    ref
  ) => {
    const theme = useTheme();

    const inputGroup = useInputGroup();
    const selectDisabled = useMemo(
      () => inputGroup?.disabled ?? disabled,
      [inputGroup, disabled]
    );

    const selectStyle = useMemo(
      () => css`
        ${inputGroup ? 'flex-shrink: 0;' : ''}
        display: inline-block;
        position: relative;
        font-size: inherit;
        border: ${inputGroup ? 'none' : `1px solid ${colors.black[300]}`};
        border-radius: 4px;
        line-height: 1.43;
        background-color: ${theme.palette.gray.white};
        > select {
          width: 100%;
          padding: 9px 28px 9px 10px;
          outline: none;
          border: none;
          appearance: none;
          color: inherit;
          background-color: transparent;
          overflow: hidden;
          text-overflow: ellipsis;
          &::-ms-expand {
            display: none;
          }
          &:invalid {
            color: ${theme.palette.gray.gray3};
          }
          &:disabled {
            opacity: 1;
            color: ${theme.palette.gray.gray4};
          }
          transition-property: color, opacity, padding;
          transition-duration: 200ms;
        }
        ::after {
          content: '';
          position: absolute;
          top: 0;
          right: 6px;
          width: 16px;
          height: 100%;
          background: url(${chevronDown}) center no-repeat;
          pointer-events: none;
          opacity: ${selectDisabled ? 0.6 : 1};
          transition-property: right, opacity;
          transition-duration: 200ms;
        }
        /* &:not([multiple]) {
          background: url(${chevronDown}) calc(100% - 6px) center no-repeat;
          padding-right: 28px;
        } */
        transition-property: border, background-color;
        transition-duration: 200ms;
      `,
      [theme, inputGroup, selectDisabled]
    );

    const textVariantStyle = useMemo(
      () => css`
        border: none;
        background-color: transparent;
        > select {
          padding: 8px 24px 8px 0;
        }
        ::after {
          right: 0;
        }
      `,
      []
    );

    return (
      <div
        css={[selectStyle, variant === 'text' && textVariantStyle]}
        className={className}
      >
        <select
          ref={ref}
          defaultValue={selectProps.value ? undefined : defaultValue}
          disabled={selectDisabled}
          data-testid={testId}
          {...selectProps}
        >
          {placeholder ? (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          ) : null}
          {options?.map((opt, idx) => {
            const value = typeof opt === 'object' ? opt[valueBind] : opt;
            const label = typeof opt === 'object' ? opt[labelBind] : opt;
            const optionDisabled =
              typeof opt === 'object' && typeof opt.disabled === 'boolean'
                ? opt.disabled
                : false;

            return (
              <option
                // eslint-disable-next-line react/no-array-index-key
                key={`${value as string}-${idx}`}
                value={value as string}
                disabled={optionDisabled}
              >
                {label as string}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);

export default Select;
