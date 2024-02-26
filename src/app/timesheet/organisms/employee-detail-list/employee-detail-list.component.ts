import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

import { DateSchedule } from '../../models/date-schedule';
import { HourPipe } from '../../pipes/hour.pipe';
import { HoursDiffPipe } from '../../pipes/hours-diff.pipe';
import { isIncompleteEntry } from '../../utils/schedule';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-detail-list',
  standalone: true,
  imports: [DatePipe, HourPipe, HoursDiffPipe, InputSwitchModule, FormsModule, TableModule],
  templateUrl: './employee-detail-list.component.html',
  styleUrl: './employee-detail-list.component.scss',
})
export class EmployeeDetailListComponent implements OnChanges {
  @Input() schedule: DateSchedule[] = [];

  scheduleData: DateSchedule[] = this.schedule;
  onlyInvalids: boolean = false;

  isIncompleteDate = isIncompleteEntry;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['schedule'].currentValue) {
      this.changeFilter(false);
    }
  }

  changeFilter(filter: boolean): void {
    this.onlyInvalids = filter;
    this.scheduleData = filter ? this.schedule.filter(value => isIncompleteEntry(value.schedule[0])) : this.schedule;
  }
}
