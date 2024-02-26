import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

import { EmployeeTableFilters } from '../../models/filters';

@Component({
  selector: 'app-employees-filters',
  standalone: true,
  imports: [CalendarModule, InputSwitchModule, FormsModule],
  templateUrl: './employees-filters.component.html',
  styleUrl: './employees-filters.component.scss',
})
export class EmployeesFiltersComponent {
  @Output() filtersChange = new EventEmitter<EmployeeTableFilters>();

  filters: EmployeeTableFilters = { view: 'daily', month: new Date() };

  changeFilter(filterName: string, value: unknown): void {
    if (filterName === 'view') {
      this.filters.view = value === false ? 'daily' : 'weekly';
    } else {
      this.filters.month = value as Date;
    }

    this.filtersChange.emit({ ...this.filters });
  }
}
