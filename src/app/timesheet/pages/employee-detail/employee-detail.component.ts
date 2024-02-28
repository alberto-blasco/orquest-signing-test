import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dayjs from 'dayjs';

import { DateSchedule } from '../../models/date-schedule';
import { Employee } from '../../models/employee';
import { EmployeeDetailHeaderComponent } from '../../molecules/employee-detail-header/employee-detail-header.component';
import { EmployeeDetailListComponent } from '../../organisms/employee-detail-list/employee-detail-list.component';
import { EmployeesService } from '../../services/employees.service';
import { getHours, isIncompleteEntry } from '../../utils/schedule';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
  imports: [EmployeeDetailListComponent, EmployeeDetailHeaderComponent],
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;
  dateSchedule: DateSchedule[] = [];
  scheduleSummary = { monthTotal: 0, weekTotal: 0, yearTotal: 0 };

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const employeeId = parseInt(params['id']);

      this.employeesService.getEmployeeById(employeeId).subscribe(value => (this.employee = value));
      this.employeesService.getDateScheduleForEmployee(employeeId).subscribe(value => this.setEmployeeSchedule(value));
    });
  }

  private setEmployeeSchedule(schedule: DateSchedule[]): void {
    this.dateSchedule = schedule;

    const currentWeek = dayjs().week();
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();
    this.scheduleSummary = schedule.reduce(
      (prev, curr) => {
        const date = dayjs(curr.date);
        if (isIncompleteEntry(curr.schedule[0])) {
          return prev;
        }

        if (date.week() === currentWeek) {
          prev.weekTotal += getHours(curr.schedule[0]);
        }

        if (date.month() === currentMonth) {
          prev.monthTotal += getHours(curr.schedule[0]);
        }

        if (date.year() === currentYear) {
          prev.yearTotal += getHours(curr.schedule[0]);
        }

        return prev;
      },
      { weekTotal: 0, monthTotal: 0, yearTotal: 0 }
    );
  }
}
