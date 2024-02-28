import dayjs from 'dayjs';

import { ScheduleDetail } from '../models/date-schedule';

export const isIncompleteEntry = (entry: ScheduleDetail): boolean => !entry.startTime || !entry.endTime;

export const getHours = (entry: ScheduleDetail): number => dayjs(entry.endTime).diff(entry.startTime, 'hours');
