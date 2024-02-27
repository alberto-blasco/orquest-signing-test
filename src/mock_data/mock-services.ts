import { of } from 'rxjs';

import { AuthService } from '../app/core/services/auth.service';
import { EmployeesService } from '../app/timesheet/services/employees.service';
import { dateScheduleMock, employeeMock, userMock } from './mock-models';

export const authServiceStub: Partial<AuthService> = {
  getUser: () => userMock,
  signOut: jasmine.createSpy('signOut'),
  isAuthenticated: () => false,
};

export const employeesServiceStub: Partial<EmployeesService> = {
  getEmployees: () => of([employeeMock]),
  getDateSchedule: () => of([dateScheduleMock]),
};
