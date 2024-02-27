import { Component, OnInit } from '@angular/core';
import { zip, map, Observable, of, finalize, delay } from 'rxjs';

import { DateSchedule, IncompleteSchedule } from '../../models/date-schedule';
import { Employee } from '../../models/employee';
import { IssuesTableComponent } from '../../organisms/issues-table/issues-table.component';
import { EmployeesService } from '../../services/employees.service';
import { isIncompleteEntry } from '../../utils/schedule';

@Component({
  selector: 'app-issues',
  standalone: true,
  templateUrl: './issues.component.html',
  styleUrl: './issues.component.scss',
  imports: [IssuesTableComponent],
})
export class IssuesComponent implements OnInit {
  invalidScheduleEntries: Observable<IncompleteSchedule[]> = of([]);
  loading: boolean = false;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.loading = true;

    this.invalidScheduleEntries = zip(
      this.employeesService.getEmployees(),
      this.employeesService.getDateSchedule()
    ).pipe(
      map(([employees, dateSchedule]) => this.composeInvalidEntries(employees, dateSchedule)),
      delay(0),
      finalize(() => (this.loading = false))
    );
  }

  private composeInvalidEntries(employees: Employee[], dateSchedule: DateSchedule[]) {
    const employeesMap = employees.reduce(
      (prev, curr) => ({ ...prev, [curr.id]: curr }),
      {} as Record<number, Employee>
    );

    return dateSchedule.reduce((prev, curr) => {
      const incompleteEntries = this.getIncompleteEntriesFromSchedule(curr, employeesMap);
      return [...prev, ...incompleteEntries];
    }, [] as IncompleteSchedule[]);
  }

  private getIncompleteEntriesFromSchedule(
    { schedule, date }: DateSchedule,
    employeesMap: Record<number, Employee>
  ): IncompleteSchedule[] {
    return schedule.reduce(
      (prev, curr) =>
        isIncompleteEntry(curr)
          ? [
              ...prev,
              {
                ...curr,
                date,
                employee: employeesMap[curr.employeeId],
              },
            ]
          : prev,
      [] as IncompleteSchedule[]
    );
  }
}
