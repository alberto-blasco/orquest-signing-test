import { ScheduleDetail } from '../models/date-schedule';
import { HoursDiffPipe } from './hours-diff.pipe';

describe('HoursDiffPipe', () => {
  const pipe = new HoursDiffPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('schedule entry is not incomplete', () => {
    it('should return the hours between startTime and endTime', () => {
      expect(
        pipe.transform({ startTime: '2024-02-27T16:00:00.000Z', endTime: '2024-02-27T20:00:00.000Z' } as ScheduleDetail)
      ).toBe('4 h');
    });
  });

  describe('schedule entry is incomplete', () => {
    it('should return "-"', () => {
      expect(pipe.transform({ endTime: '2024-02-27T20:00:00.000Z' } as ScheduleDetail)).toBe('-');
    });
  });
});
