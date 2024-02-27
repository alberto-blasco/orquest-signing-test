import { Component } from '@angular/core';

import { INITIAL_FILTERS_VALUES } from '../../constants/filters';
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
  filters: EmployeeTableFilters = INITIAL_FILTERS_VALUES;

  constructor() {}

  updateFilters(filters: EmployeeTableFilters): void {
    this.filters = filters;
  }
}
