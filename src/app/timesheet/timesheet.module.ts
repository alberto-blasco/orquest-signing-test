import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

import { EmployeesComponent } from './pages/employees/employees.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { IssuesComponent } from './pages/issues/issues.component';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.locale($localize.locale);

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
  { path: 'issues', component: IssuesComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TimesheetModule {}
