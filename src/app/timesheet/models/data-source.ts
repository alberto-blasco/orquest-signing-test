import { DateSchedule } from './date-schedule';
import { Employee } from './employee';

export interface DataSource {
  employees: Employee[];
  dates: DateSchedule[];
}
