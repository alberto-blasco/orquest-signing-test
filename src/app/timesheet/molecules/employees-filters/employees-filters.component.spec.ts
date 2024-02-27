import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFiltersComponent } from './employees-filters.component';
import { INITIAL_FILTERS_VALUES } from 'app/timesheet/constants/filters';

describe('EmployeesFiltersComponent', () => {
  let component: EmployeesFiltersComponent;
  let fixture: ComponentFixture<EmployeesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('filters change', () => {
    it('should set "view" as "daily" when value is false', () => {
      const filters = INITIAL_FILTERS_VALUES;
      component.changeFilter('view', false);
      expect(component.filters).toEqual({ ...filters, view: 'daily' });
    });

    it('should set "view" as "weekly" when value is true', () => {
      const filters = INITIAL_FILTERS_VALUES;
      component.changeFilter('view', true);
      expect(component.filters).toEqual({ ...filters, view: 'weekly' });
    });

    it('should set "month" as passed value', () => {
      const filters = INITIAL_FILTERS_VALUES;
      const date = new Date();
      component.changeFilter('month', date);
      expect(component.filters).toEqual({ ...filters, month: date });
    });

    it('should emit filtersChange event when filter changes', () => {
      const filters = INITIAL_FILTERS_VALUES;
      spyOn(component.filtersChange, 'emit');

      component.changeFilter('month', filters.month);

      expect(component.filtersChange.emit).toHaveBeenCalledWith(filters);
    });
  });
});
