import { User } from 'app/core/models/user.model';
import { DataSource } from 'app/timesheet/models/data-source';
import { DateSchedule } from 'app/timesheet/models/date-schedule';
import { Employee } from 'app/timesheet/models/employee';

export const userMock: User = {
  name: 'Ash',
  email: 'ash.ketchum@kanto.es',
};

export const employeeMock: Employee = {
  id: 1,
  name: 'Antonio',
  lastName: 'Genaro',
};

export const dateScheduleMock: DateSchedule = {
  date: '2024-02-05',
  schedule: [
    {
      employeeId: 1,
      startTime: '2024-02-05T08:00:00Z',
      endTime: '2024-02-05T12:00:00Z',
    },
  ],
};

export const dataSourceMock: DataSource = {
  employees: [employeeMock],
  dates: [dateScheduleMock],
};
