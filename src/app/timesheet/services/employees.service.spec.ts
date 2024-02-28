import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_BASE_URL } from 'app/core/constants/api';
import { EmployeesService } from './employees.service';
import { dataSourceMock, employeeMock } from 'mock_data/mock-models';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(EmployeesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return employees when request to getEmployees is made', () => {
    service.getEmployees().subscribe(employees => {
      expect(employees).toEqual(dataSourceMock.employees);
    });

    const req = httpTestingController.expectOne(API_BASE_URL + '/prueba-orquest-datos.json');
    expect(req.request.method).toEqual('GET');
    req.flush(dataSourceMock);
    httpTestingController.verify();
  });

  it('should return dates when request to getDateSchedule is made', () => {
    service.getDateSchedule().subscribe(dates => {
      expect(dates).toEqual(dataSourceMock.dates);
    });

    const req = httpTestingController.expectOne(API_BASE_URL + '/prueba-orquest-datos.json');
    expect(req.request.method).toEqual('GET');
    req.flush(dataSourceMock);
    httpTestingController.verify();
  });

  it('should return one employee when request to getEmployeeById is made', () => {
    const employee = employeeMock;

    service.getEmployeeById(employee.id).subscribe(resEmployee => {
      expect(resEmployee).toEqual(employee);
    });

    const req = httpTestingController.expectOne(API_BASE_URL + '/prueba-orquest-datos.json');
    expect(req.request.method).toEqual('GET');
    req.flush({ employees: [employee] });
    httpTestingController.verify();
  });

  it('should return one employee schedule when request to getDateScheduleForEmployee is made', () => {
    const [employee] = dataSourceMock.employees;

    service.getDateScheduleForEmployee(employee.id).subscribe(resSchedule => {
      expect(resSchedule).toEqual(dataSourceMock.dates);
    });

    const req = httpTestingController.expectOne(API_BASE_URL + '/prueba-orquest-datos.json');
    expect(req.request.method).toEqual('GET');
    req.flush({ dates: dataSourceMock.dates });
    httpTestingController.verify();
  });
});
