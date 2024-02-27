import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import dayjs from 'dayjs';
import { TableModule } from 'primeng/table';
import { map, of, zip } from 'rxjs';

import { INITIAL_FILTERS_VALUES } from '../../constants/filters';
import { DateSchedule } from '../../models/date-schedule';
import { Employee } from '../../models/employee';
import { EmployeeTableFilters } from '../../models/filters';
import { EmployeesService } from '../../services/employees.service';
import { getHours, isIncompleteEntry } from '../../utils/schedule';

interface Column {
  field: string;
  header: string;
}

interface EmployeeRow {
  employee?: Employee;
  days: Record<string, number>;
  weeks: Record<string, number>;
  months: Record<string, number>;
}

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [AsyncPipe, NgFor, RouterLink, TableModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss',
})
export class EmployeesTableComponent implements OnInit, OnChanges {
  @Input() filters: EmployeeTableFilters = INITIAL_FILTERS_VALUES;

  employeesRows$ = of([] as EmployeeRow[]);
  middleColumns: Column[] = [];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.employeesRows$ = zip(this.employeesService.getEmployees(), this.employeesService.getDateSchedule()).pipe(
      map(([employees, dateSchedule]) => this.composeTableData(employees, dateSchedule)),
      map(data => Object.values(data))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'].currentValue) {
      this.updateFilters(changes['filters'].currentValue);
    }
  }

  getHourCellContent(row: EmployeeRow, colField: string): string {
    const value = this.filters.view === 'daily' ? row.days[colField] : row.weeks[colField];
    return !value || value === -1 ? '-' : `${value} h`;
  }

  isIncomplete(row: EmployeeRow, colField: string): boolean {
    const value = this.filters.view === 'daily' ? row.days[colField] : row.weeks[colField];
    return value === -1;
  }

  private composeTableData(employees: Employee[], dateSchedule: DateSchedule[]) {
    return dateSchedule.reduce(
      (prev, curr) => {
        const date = dayjs(curr.date);
        curr.schedule.forEach(schedule => {
          if (!prev[schedule.employeeId]) {
            prev[schedule.employeeId] = {
              employee: employees.find(({ id }) => id === schedule.employeeId),
              days: {},
              weeks: {},
              months: {},
            };
          }

          const emplData = prev[schedule.employeeId];
          if (!isIncompleteEntry(schedule)) {
            const hours = getHours(schedule);
            emplData.days[curr.date] = hours;
            emplData.weeks[date.week()] = (emplData.weeks[date.week()] ?? 0) + hours;
            emplData.months[date.month()] = (emplData.months[date.month()] ?? 0) + hours;
          } else {
            emplData.days[curr.date] = -1;
          }
        });

        return prev;
      },
      {} as Record<number, EmployeeRow>
    );
  }

  private updateFilters(filters: EmployeeTableFilters): void {
    const dayjsMonth = dayjs(filters.month);
    this.middleColumns = [];

    if (filters.view === 'daily') {
      const daysInMonth = dayjsMonth.daysInMonth();
      for (let i = 1; i < daysInMonth + 1; i++) {
        this.middleColumns.push({ field: dayjsMonth.date(i).format('YYYY-MM-DD'), header: `Día ${i}` });
      }
    } else {
      const firstMonthWeek = dayjs(dayjsMonth).date(1).week();
      const nextMonthWeek = dayjs(dayjsMonth).date(1).add(1, 'month').week();

      for (let i = firstMonthWeek; i < nextMonthWeek; i++) {
        this.middleColumns.push({ field: i.toString(), header: `Semana ${i}` });
      }
    }
  }
}
