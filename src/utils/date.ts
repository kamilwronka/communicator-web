import {
  differenceInDays,
  differenceInMinutes,
  formatRelative,
  intlFormat,
  isToday,
} from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';

export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const isOverOneDay = (date: string) => {
  const currentDate = Date.now();
  const currentDateUTC = zonedTimeToUtc(currentDate, getTimezone());
  const dateToCompare = new Date(date);

  return differenceInDays(currentDateUTC, dateToCompare) >= 1;
};

export const isOverTenMinutes = (date: string) => {
  const currentDate = Date.now();
  const currentDateUTC = zonedTimeToUtc(currentDate, getTimezone());

  const dateToCompare = new Date(date);

  return differenceInMinutes(currentDateUTC, dateToCompare) >= 10;
};

export const formatDateRelative = (date: string) => {
  const currentDate = Date.now();
  const currentDateUTC = zonedTimeToUtc(currentDate, getTimezone());

  return formatRelative(new Date(date), currentDateUTC, { locale: enUS });
};

export const formatDateIntl = (date: string) => {
  const zonedTime = utcToZonedTime(new Date(date), getTimezone());

  return intlFormat(
    zonedTime,
    { month: 'long', day: '2-digit', year: 'numeric' },
    { locale: 'en-GB' },
  );
};

export const isTodayInTimezone = (date: string) => {
  const zonedTime = utcToZonedTime(new Date(date), getTimezone());

  return isToday(zonedTime);
};
