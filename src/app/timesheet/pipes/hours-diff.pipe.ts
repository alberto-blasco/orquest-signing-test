import { Pipe, PipeTransform } from '@angular/core';

import { ScheduleDetail } from '../models/date-schedule';
import { getHours, isIncompleteEntry } from '../utils/schedule';

@Pipe({
  name: 'hoursDiff',
  standalone: true,
})
export class HoursDiffPipe implements PipeTransform {
  transform(value: ScheduleDetail): string {
    if (isIncompleteEntry(value)) {
      return '-';
    }

    return `${getHours(value)} h`;
  }
}
