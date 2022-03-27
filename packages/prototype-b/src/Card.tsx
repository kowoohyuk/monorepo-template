import { useState } from 'react';

import { css } from '@emotion/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Form, Input, Select } from '@common/components';
import { colors } from '@common/styles';

const schema = z.object({
  font: z.string(),
  first: z.string().min(1).max(6),
  second: z.string().max(6).default(''),
});

const Card = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const [text, setText] = useState<{
    font: string;
    first: string;
    second: string;
  }>({
    font: '',
    first: '',
    second: '',
  });

  const styles = css`
    &,
    * {
      box-sizing: border-box;
    }
    .card-field {
      background-color: ${colors.black};
      border-radius: 8px;
      column-gap: 10px;
      display: flex;
      font-family: ${text.font}, 'Apple SD Gothic Neo', sans-serif;
      font-size: 32px;
      height: 120px;
      justify-content: center;
      margin: 5vh auto;
      text-align: center;
      padding: 40px 0;
      width: 400px;
      .mint {
        color: ${colors.mint[300]};
      }
      .white {
        color: ${colors.white};
      }
    }
    .form-field {
      form {
        column-gap: 10px;
        display: flex;
        flex-flow: wrap;
        margin: 0 auto;
        width: 400px;
      }
      .select {
        width: 100%;
        margin-bottom: 10px;
        & > * {
          width: 30%;
        }
      }
    }
  `;

  return (
    <div css={styles}>
      <div className="card-field">
        <span className="mint">{text.first}</span>
        <span className="white">{text.second}</span>
      </div>
      <div className="form-field">
        <Form>
          <div className="select">
            폰트
            <Select
              variant="outlined"
              {...register('font')}
              options={['Do Hyeon', 'Jua']}
            />
          </div>
          <Input {...register('first')} placeholder="최대 6글자" />
          <Input {...register('second')} placeholder="최대 6글자" />
          <Button
            text="만들기"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleSubmit(data => {
              setText(data);
            })}
          />
        </Form>
      </div>
    </div>
  );
};

export default Card;
