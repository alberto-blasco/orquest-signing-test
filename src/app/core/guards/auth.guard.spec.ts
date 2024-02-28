import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { authServiceStub } from 'mock_data/mock-services';

describe('authGuard', () => {
  const mockState = {} as RouterStateSnapshot;
  let router: Router;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    });

    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('user has not logged in', () => {
    beforeEach(() => {
      const authService = TestBed.inject(AuthService);
      spyOn(authService, 'isAuthenticated').and.returnValue(false);
    });

    it('should grant access to /login', () => {
      const mockRoute = { url: [{ path: 'login' }] } as ActivatedRouteSnapshot;

      const result = executeGuard(mockRoute, mockState);
      expect(result).toBeTrue();
    });

    it('should redirect to login page when tries to access another route', () => {
      const mockRoute = { url: [{ path: '' }] } as ActivatedRouteSnapshot;
      spyOn(router, 'navigateByUrl');

      const result = executeGuard(mockRoute, mockState);
      expect(result).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    });
  });

  describe('user has logged in', () => {
    beforeEach(() => {
      const authService = TestBed.inject(AuthService);
      spyOn(authService, 'isAuthenticated').and.returnValue(true);
    });

    it('should grant access to authenticated routes', () => {
      const mockRoute = { url: [{ path: '' }] } as ActivatedRouteSnapshot;

      const result = executeGuard(mockRoute, mockState);
      expect(result).toBeTrue();
    });

    it('should redirect to initial page when tries to access login page', () => {
      const mockRoute = { url: [{ path: 'login' }] } as ActivatedRouteSnapshot;
      spyOn(router, 'navigateByUrl');

      const result = executeGuard(mockRoute, mockState);
      expect(result).toBeFalse();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
