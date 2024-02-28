import { Employee } from './employee';

export interface ScheduleDetail {
  employeeId: number;
  startTime?: string;
  endTime?: string;
}

export interface DateSchedule {
  date: string;
  schedule: ScheduleDetail[];
}

export type IncompleteSchedule = {
  date: string;
  employee: Employee | undefined;
} & ScheduleDetail;
