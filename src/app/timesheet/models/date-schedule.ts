export interface ScheduleDetail {
  employeeId: number;
  startTime?: string;
  endTime?: string;
}

export interface DateSchedule {
  date: string;
  schedule: ScheduleDetail[];
}
