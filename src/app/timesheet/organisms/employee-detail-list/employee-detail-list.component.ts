import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

import { DateSchedule } from '../../models/date-schedule';
import { HourPipe } from '../../pipes/hour.pipe';
import { HoursDiffPipe } from '../../pipes/hours-diff.pipe';
import { getHours, isIncompleteEntry } from '../../utils/schedule';

@Component({
  selector: 'app-employee-detail-list',
  standalone: true,
  imports: [DatePipe, HourPipe, HoursDiffPipe, InputSwitchModule, FormsModule, TableModule],
  templateUrl: './employee-detail-list.component.html',
  styleUrl: './employee-detail-list.component.scss',
})
export class EmployeeDetailListComponent implements OnChanges {
  @Input() schedule: DateSchedule[] = [];

  scheduleData: (DateSchedule & { week: number })[] = [];
  onlyInvalids: boolean = false;

  isIncompleteDate = isIncompleteEntry;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['schedule'].currentValue) {
      this.changeFilter(false);
    }
  }

  changeFilter(filter: boolean): void {
    this.onlyInvalids = filter;
    const filtered = filter ? this.schedule.filter(value => isIncompleteEntry(value.schedule[0])) : this.schedule;
    this.scheduleData = filtered.map(val => ({ ...val, week: dayjs(val.date).week() }));
  }

  getWeekTotal(week: number): number {
    return this.scheduleData.reduce(
      (prev, curr) =>
        curr.week === week && !isIncompleteEntry(curr.schedule[0]) ? prev + getHours(curr.schedule[0]) : prev,
      0
    );
  }
}
