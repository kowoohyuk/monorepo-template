import { Story, Meta } from '@storybook/react';

import Select, { SelectProps } from '.';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

export const DefaultSelect: Story<SelectProps> = args => <Select {...args} />;
DefaultSelect.storyName = 'Select';
DefaultSelect.args = {
  placeholder: '전체 옵션',
  options: [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
  ],
};
