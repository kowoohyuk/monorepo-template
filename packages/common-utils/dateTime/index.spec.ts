import { getTimeString, getDateString } from '.';

const DAY = {
  date: '2022-02-22',
  timeString: '00:00',
  dateString: '2022-02-22',
};
const HOUR = {
  date: '2022-02-22 22:',
  timeString: '22:00',
};
const MINUTE = {
  date: '2022-02-22 22:22',
  timeString: '22:22',
};
const SECOND = {
  date: '2022-02-22 22:22:22',
  timeString: '22:22',
};
const MILLISECOND = {
  date: '2022-02-22 22:22:22.222',
  timeString: '22:22',
};
const TIME_SEPARATOR = {
  date: '2022-02-22 22:22:22',
  timeString: '22:22',
};
const ZULU = {
  date: '2022-02-22T22:22:22Z',
  timeString: '22:22',
};
const KST = {
  date: '2022-02-22 22:22:22.222+09:00',
  timeString: '13:22',
  dateString: '2022-02-22',
};

describe('dateTime utils', () => {
  it('getTimeString, string 타입의 날짜를 [HH:mm] 형식으로 나타낸다', () => {
    expect(getTimeString(DAY.date)).toEqual(DAY.timeString);
    expect(getTimeString(HOUR.date)).toEqual(HOUR.timeString);
    expect(getTimeString(MINUTE.date)).toEqual(MINUTE.timeString);
    expect(getTimeString(SECOND.date)).toEqual(SECOND.timeString);
    expect(getTimeString(MILLISECOND.date)).toEqual(MILLISECOND.timeString);
    expect(getTimeString(TIME_SEPARATOR.date)).toEqual(
      TIME_SEPARATOR.timeString
    );
    expect(getTimeString(ZULU.date)).toEqual(ZULU.timeString);
    expect(getTimeString(KST.date)).toEqual(KST.timeString);
  });

  it('getDateString, string 타입의 날짜를 [yyyy-MM-dd] 형식으로 나타낸다', () => {
    expect(getDateString(DAY.date)).toEqual(DAY.dateString);
    expect(getDateString(KST.date)).toEqual(KST.dateString);
  });
});
