import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule], providers: [MessageService] });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set authentication state to true when user logs in with valid credentials', (done: DoneFn) => {
    const email = 'test@example.com';
    const password = 'password';
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    service.login(email, password).subscribe(() => {
      expect(service.isAuthenticated()).toBe(true);
      expect(router.navigate).toHaveBeenCalledWith(['']);
      done();
    });
  });

  it('should set authentication state to false when user logs in with empty email', (done: DoneFn) => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    service.login('', 'password').subscribe({
      error: status => {
        expect(status).toBe('KO');
        expect(service.isAuthenticated()).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['login']);
        done();
      },
    });
  });

  it('should set authentication state to false when user logs out', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    service.signOut();

    expect(service.isAuthenticated()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should return current logged user', (done: DoneFn) => {
    const email = 'test@example.com';
    const password = 'password';

    service.login(email, password).subscribe(() => {
      expect(service.getUser()).toEqual({ email, name: 'test' });
      done();
    });
  });
});
