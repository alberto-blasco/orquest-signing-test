import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import dayjs from 'dayjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

import { User } from '../models/user.model';

const TOKEN_EXPIRATION = 1 * 60 * 1000; // 1h

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticationState: BehaviorSubject<boolean>;
  private user: User;

  state$: Observable<boolean>;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {
    const user = localStorage.getItem('user');

    this.authenticationState = new BehaviorSubject<boolean>(!!user);
    this.user = user ? JSON.parse(user) : null;
    this.state$ = this.authenticationState.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(email: string, password: string): Observable<string> {
    this.user = { email, name: email.split('@')[0] };

    return new Observable(subscriber => {
      setTimeout(() => {
        this.setAuthState(true);
        subscriber.next('OK');
        subscriber.complete();
      }, 1000);
    });
  }

  signOut(): void {
    this.setAuthState(false);
  }

  isAuthenticated() {
    if (this.authenticationState.value) {
      const token = localStorage.getItem('access_token');
      if (!token) {
        this.setAuthState(false);
        return false;
      }

      const { expiresIn } = JSON.parse(token);
      if (dayjs().isAfter(dayjs(expiresIn))) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Su sesión ha caducado' });
        this.setAuthState(false);
        return false;
      }
    }

    return this.authenticationState.value;
  }

  getUser(): User {
    return this.user;
  }

  private setAuthState(authState: boolean): void {
    this.authenticationState.next(authState);

    if (authState) {
      const mockToken = { expiresIn: dayjs().add(TOKEN_EXPIRATION, 'milliseconds').toJSON() };
      localStorage.setItem('user', JSON.stringify(this.user));
      localStorage.setItem('access_token', JSON.stringify(mockToken));

      this.router.navigate(['users']);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      this.router.navigate(['login']);
    }
  }
}
