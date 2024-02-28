import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesService } from 'app/timesheet/services/employees.service';
import { employeesServiceStub } from 'mock_data/mock-services';
import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuesComponent],
      providers: [{ provide: EmployeesService, useValue: employeesServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
