import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

import { Employee } from '../../models/employee';

interface ScheduleSummary {
  monthTotal: number;
  weekTotal: number;
  yearTotal: number;
}

@Component({
  selector: 'app-employee-detail-header',
  standalone: true,
  imports: [CardModule],
  templateUrl: './employee-detail-header.component.html',
  styleUrl: './employee-detail-header.component.scss',
})
export class EmployeeDetailHeaderComponent {
  @Input() employee?: Employee;
  @Input() summary?: ScheduleSummary;
}
