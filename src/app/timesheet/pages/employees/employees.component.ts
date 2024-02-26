import { Component } from '@angular/core';

import { EmployeesFiltersComponent } from '../../molecules/employees-filters/employees-filters.component';
import { EmployeeTableFilters } from '../../models/filters';
import { EmployeesTableComponent } from '../../organisms/employees-table/employees-table.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  imports: [EmployeesTableComponent, EmployeesFiltersComponent],
})
export class EmployeesComponent {
  filters: EmployeeTableFilters = { view: 'daily', month: new Date() };

  constructor() {}

  updateFilters(filters: EmployeeTableFilters): void {
    this.filters = filters;
  }
}
