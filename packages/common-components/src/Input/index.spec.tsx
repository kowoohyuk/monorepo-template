import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/testUtils';

import Input from './index';

describe('Input', () => {
  describe('타입 공통', () => {
    it('focus 했을 때 onFocus 콜백을 실행한다', () => {
      const mockOnFocus = jest.fn(() => 'focused');
      render(<Input testId="a-text-input" onFocus={mockOnFocus} />);

      const inputElement = screen
        .getByTestId('a-text-input')
        .querySelector('input');

      if (inputElement) {
        userEvent.click(inputElement);
        expect(mockOnFocus).toHaveBeenCalledTimes(1);
      }
    });

    it('value가 변경되었을 때, onChange 콜백을 실행한다', () => {
      const initialValue = 'Hello';
      const mockOnChange = jest.fn(() => 'changed');

      render(
        <Input
          testId="a-text-input"
          value={initialValue}
          onChange={mockOnChange}
        />
      );
      const inputElement = screen
        .getByTestId('a-text-input')
        .querySelector('input');

      if (inputElement) {
        userEvent.type(inputElement, '!');
        expect(mockOnChange).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('text 타입', () => {
    it('enable 상태에서는 텍스트를 입력할 수 있다', () => {
      render(<Input testId="a-text-input" />);
      const textInputElement = screen
        .getByTestId('a-text-input')
        .querySelector('input');

      if (textInputElement) {
        userEvent.type(textInputElement, 'Hello world');
        expect(textInputElement).toHaveValue('Hello world');
      }
    });

    it('disabled 상태에서는 텍스트를 입력할 수 없다', () => {
      render(<Input testId="a-text-input" disabled />);
      const textInputElement = screen
        .getByTestId('a-text-input')
        .querySelector('input');

      if (textInputElement) {
        userEvent.type(textInputElement, 'Hello world');
        expect(textInputElement).not.toHaveValue('Hello world');
      }
    });

    it('문자열 copy and paste가 가능하다', () => {
      const copiedString = 'Hello world';

      render(<Input testId="a-text-input" />);
      const textInputElement = screen
        .getByTestId('a-text-input')
        .querySelector('input');

      if (textInputElement) {
        userEvent.paste(textInputElement, copiedString);
        expect(textInputElement).toHaveValue(copiedString);
      }
    });
  });

  describe('number 타입', () => {
    it('숫자를 제외한 character를 입력할 수 없다', () => {
      render(<Input testId="a-number-input" type="number" />);
      const numberInputElement = screen
        .getByTestId('a-number-input')
        .querySelector('input');

      if (numberInputElement) {
        userEvent.type(numberInputElement, '2021');

        expect(numberInputElement).toHaveValue(2021);

        userEvent.type(numberInputElement, 'Hello world');

        expect(numberInputElement).toHaveValue(null);

        userEvent.type(numberInputElement, '!@#$%^&');

        expect(numberInputElement).toHaveValue(null);
      }
    });

    it('enable 상태에서는 숫자를 입력할 수 있다', () => {
      render(<Input testId="a-number-input" type="number" />);
      const numberInputElement = screen
        .getByTestId('a-number-input')
        .querySelector('input');

      if (numberInputElement) {
        userEvent.type(numberInputElement, '2021');
        expect(numberInputElement).toHaveValue(2021);
      }
    });

    it('disabled 상태에서는 숫자를 입력할 수 없다', () => {
      render(<Input testId="a-number-input" type="number" disabled />);
      const numberInputElement = screen
        .getByTestId('a-number-input')
        .querySelector('input');

      if (numberInputElement) {
        userEvent.type(numberInputElement, '2021');

        expect(numberInputElement).not.toHaveValue(2021);
        expect(numberInputElement).toHaveValue(null);
      }
    });
  });

  describe('hidden 타입', () => {
    it('컴포넌트가 노출되지 않는다', () => {
      render(<Input testId="a-hidden-input" type="hidden" />);

      expect(screen.getByTestId('a-hidden-input')).not.toBeVisible();
    });
  });

  describe('file 타입', () => {
    it('하나의 파일을 업로드 할 수 있다', () => {
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });

      render(<Input testId="a-file-input" type="file" />);
      const fileInputElement = screen
        .getByTestId('a-file-input')
        .querySelector('input');

      if (fileInputElement) {
        userEvent.upload(fileInputElement, file);

        expect(fileInputElement.files?.[0]).toStrictEqual(file);
        expect(fileInputElement.files).toHaveLength(1);
      }
    });

    it('다수의 파일들을 업로드 할 수 있다', () => {
      const files = [
        new File(['hello'], 'hello.png', { type: 'image/png' }),
        new File(['world'], 'world.png', { type: 'image/png' }),
      ];

      render(<Input testId="a-file-input" type="file" multiple />);
      const fileInputElement = screen
        .getByTestId('a-file-input')
        .querySelector('input');

      if (fileInputElement) {
        userEvent.upload(fileInputElement, files);

        expect(fileInputElement.files).toContainEqual(files[0]);
        expect(fileInputElement.files).toContainEqual(files[1]);
        expect(fileInputElement.files).toHaveLength(2);
      }
    });
  });
});
