import { format } from 'date-fns';

export const getTimeString = (date: string) => format(new Date(date), 'HH:mm');

export const getDateString = (date: string) =>
  format(new Date(date), 'yyyy-MM-dd');
