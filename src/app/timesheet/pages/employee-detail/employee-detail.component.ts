import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee';
import { DateSchedule } from '../../models/date-schedule';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDetailListComponent } from '../../organisms/employee-detail-list/employee-detail-list.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
  imports: [EmployeeDetailListComponent],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;
  dateSchedule: DateSchedule[] = [];

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const employeeId = parseInt(params['id']);

      this.employeesService.getEmployeeById(employeeId).subscribe(value => (this.employee = value));
      this.employeesService.getDateScheduleForEmployee(employeeId).subscribe(value => (this.dateSchedule = value));
    });
  }
}
