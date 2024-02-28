import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defer, delay, first, isObservable, map, mergeMap, of, shareReplay } from 'rxjs';

import { API_BASE_URL, CACHE_TIME } from '../../core/constants/api';
import { DataSource } from '../models/data-source';
import { DateSchedule } from '../models/date-schedule';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  dataSource$!: Observable<DataSource>;

  constructor(private http: HttpClient) {
    this.getData();
  }

  private getData() {
    this.dataSource$ = this.http.get<DataSource>(API_BASE_URL + '/prueba-orquest-datos.json').pipe(
      delay(750), // Just simulate real api delay
      shareReplay({ bufferSize: 1, windowTime: CACHE_TIME, refCount: false }),
      first(
        null,
        defer(() => this.getData())
      ),
      mergeMap(d => (isObservable(d) ? d : of(d)))
    );

    return this.dataSource$;
  }

  getEmployees() {
    return this.dataSource$.pipe(map(({ employees }) => employees));
  }

  getEmployeeById(id: number) {
    return this.getEmployees().pipe(map(employees => employees.find(employee => employee.id === id)));
  }

  getDateSchedule() {
    return this.dataSource$.pipe(map(({ dates }) => dates));
  }

  getDateScheduleForEmployee(id: number) {
    return this.getDateSchedule().pipe(
      map(dates =>
        dates.reduce((prev, curr) => {
          const schedule = curr.schedule.filter(details => details.employeeId === id);
          return schedule.length ? [...prev, { ...curr, schedule }] : prev;
        }, [] as DateSchedule[])
      )
    );
  }
}
