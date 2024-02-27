import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Observable, of } from 'rxjs';

import { IncompleteSchedule } from '../../models/date-schedule';
import { HourPipe } from '../../pipes/hour.pipe';

@Component({
  selector: 'app-issues-table',
  standalone: true,
  imports: [AsyncPipe, DatePipe, HourPipe, NgFor, RouterLink, TableModule],
  templateUrl: './issues-table.component.html',
  styleUrl: './issues-table.component.scss',
})
export class IssuesTableComponent {
  @Input() incompleteEntries$: Observable<IncompleteSchedule[]> = of([]);
  @Input() loading!: boolean;
}
