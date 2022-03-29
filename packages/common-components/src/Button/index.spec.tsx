import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/testUtils';

import Button from '.';

describe('Button', () => {
  const BUTTON_ID = 'test-button';
  it('contents를 rendering 한다', () => {
    render(
      <Button testId={BUTTON_ID} text="확인" className="confirm-button" />
    );
    const buttonComponent = screen.getByTestId(BUTTON_ID);

    expect(buttonComponent).toHaveClass('confirm-button');
    expect(buttonComponent).toHaveTextContent('확인');
  });

  it('children을 rendering 한다', () => {
    render(
      <Button testId={BUTTON_ID}>
        <span>취소</span>
      </Button>
    );

    expect(screen.getByTestId(BUTTON_ID).children).not.toBeNull();
    expect(screen.getByTestId(BUTTON_ID).firstElementChild).toHaveTextContent(
      '취소'
    );
  });

  it('클릭하면 onClick 콜백을 실행한다', () => {
    const mockOnClick = jest.fn(() => 'clicked');

    render(<Button testId={BUTTON_ID} text="확인" onClick={mockOnClick} />);

    userEvent.click(screen.getByTestId(BUTTON_ID));

    expect(screen.getByTestId(BUTTON_ID)).toBeEnabled();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('disabled이면 onClick 콜백을 실행하지 않는다', () => {
    const mockOnClick = jest.fn(() => 'clicked');

    render(
      <Button testId={BUTTON_ID} text="확인" disabled onClick={mockOnClick} />
    );

    userEvent.click(screen.getByTestId(BUTTON_ID));

    expect(screen.getByTestId(BUTTON_ID)).toBeDisabled();
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
