import { Pipe, PipeTransform } from '@angular/core';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Pipe({
  name: 'hour',
  standalone: true,
})
export class HourPipe implements PipeTransform {
  transform(value: string): string {
    return dayjs.utc(value).tz('Europe/Madrid').format('HH:mm:ss');
  }
}
