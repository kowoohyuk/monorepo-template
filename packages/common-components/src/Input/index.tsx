import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useMemo,
  useState,
} from 'react';

import { css, useTheme } from '@emotion/react';
import cx from 'clsx';
import cuid from 'cuid';

import { useInputGroup } from '../InputGroupContext';

export interface InputProps {
  className?: string;
  type?: 'text' | 'number' | 'file' | 'password' | 'hidden';
  name?: string;
  placeholder?: string;
  prefix?: string;
  postfix?: string;
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  min?: string | number;
  max?: string | number;
  step?: number;
  accept?: string;
  multiple?: boolean;
  align?: 'left' | 'right';
  autoComplete?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  testId?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      prefix = '',
      postfix = '',
      type = 'text',
      disabled,
      onChange,
      testId,
      align = 'left',
      ...inputProps
    },
    ref
  ) => {
    const [id] = useState<string>(cuid());
    const [fileName, setFileName] = useState<string>();
    const theme = useTheme();

    const inputGroup = useInputGroup();
    const inputDisabled = useMemo(
      () => inputGroup?.disabled ?? disabled,
      [inputGroup, disabled]
    );

    const handleChange = useMemo(
      () =>
        type === 'file' || onChange
          ? (event: ChangeEvent<HTMLInputElement>) => {
              if (type === 'file') {
                const { files } = event.target;
                const fileNames: string[] = [];
                for (let i = 0; i < (files?.length ?? 0); i += 1) {
                  fileNames.push(files?.item(i)?.name ?? '');
                }
                setFileName(fileNames.join(', '));
              }
              if (onChange) {
                onChange(event);
              }
            }
          : undefined,
      [type, onChange]
    );

    const inputRootStyle = useMemo(
      () => css`
        ${inputGroup ? 'width: 100%;' : ''}
        display: ${type === 'hidden' ? 'none' : 'inline-flex'};
        position: relative;
        border: ${inputGroup
          ? 'none'
          : `1px solid ${theme.palette.gray.gray5}`};
        border-radius: 4px;
        padding: 9px 10px;
        line-height: 1.43;
        font-size: inherit;
        transition: 200ms border;
        background-color: ${theme.palette.gray.white};
        label {
          ${type === 'file' ? 'flex-shrink: 0;' : 'flex-grow: 1;'}
          ${inputDisabled && `color: ${theme.palette.gray.gray4};`}
          color: ${theme.palette.hue.mint};
          font-weight: ${theme.palette.fontWeight.bold};
          > .file-label {
            white-space: nowrap;
            display: inline-block;
            width: 100%;
            text-align: center;
            transition: 200ms opacity;
            &:hover {
              opacity: 0.8;
              cursor: pointer;
            }
          }
        }
        input {
          ${type === 'file' && 'display: none;'}
          width: 100%;
          line-height: inherit;
          outline: none;
          border: none;
          padding: 0;
          text-align: ${align};
          background-color: transparent;
          &::placeholder {
            color: ${theme.palette.gray.gray3};
            transition: 200ms color;
          }
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          &[type='number'] {
            -moz-appearance: textfield;
          }
          &:disabled {
            color: ${theme.palette.gray.gray4};
            &::placeholder {
              color: ${theme.palette.gray.gray4};
            }
          }
          transition: 200ms color;
        }
        > .file-name {
          flex: 1 1 auto;
          margin-right: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
        }
        > .prefix,
        > .postfix {
          line-height: inherit;
          color: ${inputDisabled
            ? theme.palette.gray.gray4
            : theme.palette.gray.gray3};
          pointer-events: none;
          white-space: nowrap;
          &.postfix {
            margin-left: 8px;
          }
          &.prefix {
            margin-right: 8px;
          }
        }
      `,
      [inputGroup, type, theme, inputDisabled, align]
    );

    return (
      <div
        css={inputRootStyle}
        className={cx(className, 'input')}
        data-testid={testId}
      >
        {fileName && (
          <span className="file-name" title={fileName}>
            {fileName}
          </span>
        )}
        {prefix && <span className="prefix">{prefix}</span>}
        <label htmlFor={id}>
          {type === 'file' && <span className="file-label">+ 파일 첨부</span>}
          <input
            id={id}
            ref={ref}
            type={type}
            disabled={inputDisabled}
            onChange={handleChange}
            {...inputProps}
          />
        </label>
        {postfix && <span className="postfix">{postfix}</span>}
      </div>
    );
  }
);

export default Input;
