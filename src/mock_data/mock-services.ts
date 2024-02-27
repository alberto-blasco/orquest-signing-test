import { of } from 'rxjs';

import { AuthService } from '../app/core/services/auth.service';
import { EmployeesService } from '../app/timesheet/services/employees.service';
import { dateScheduleMock, employeeMock, userMock } from './mock-models';

export const authServiceStub: Partial<AuthService> = {
  getUser: () => userMock,
  login: () => of(''),
  signOut: jasmine.createSpy('signOut'),
  isAuthenticated: () => false,
};

export const employeesServiceStub: Partial<EmployeesService> = {
  getEmployees: jasmine.createSpy('getEmployees').and.returnValue(of([employeeMock])),
  getDateSchedule: jasmine.createSpy('getDateSchedule').and.returnValue(of([dateScheduleMock])),
  getEmployeeById: jasmine.createSpy('getEmployeeById').and.returnValue(of(employeeMock)),
  getDateScheduleForEmployee: jasmine.createSpy('getDateScheduleForEmployee').and.returnValue(of([dateScheduleMock])),
};
