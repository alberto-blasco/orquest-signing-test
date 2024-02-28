import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { dateScheduleMock, employeeMock } from 'mock_data/mock-models';
import { employeesServiceStub } from 'mock_data/mock-services';
import { EmployeesService } from '../../services/employees.service';
import { EmployeeDetailComponent } from './employee-detail.component';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailComponent, RouterTestingModule],
      providers: [
        { provide: EmployeesService, useValue: employeesServiceStub },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve employee data and schedule when employee id is provided in route params', () => {
    const employeesService = TestBed.inject(EmployeesService);

    expect(employeesService.getEmployeeById).toHaveBeenCalledWith(1);
    expect(employeesService.getDateScheduleForEmployee).toHaveBeenCalledWith(1);
    expect(component.employee).toEqual(employeeMock);
    expect(component.dateSchedule).toEqual([dateScheduleMock]);
  });
});
