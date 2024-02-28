import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';

import { AuthService } from 'app/core/services/auth.service';
import { authServiceStub } from 'mock_data/mock-services';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully when valid credentials are provided', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(of('OK'));

    const messageService = TestBed.inject(MessageService);
    spyOn(messageService, 'add');

    component.onLogin({ email: 'test@example.com', password: 'password' });

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'success' }));
    expect(component.isLoading).toBe(false);
  });

  it('should fail login when invalid credentials are provided', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.returnValue(throwError(() => 'KO'));

    const messageService = TestBed.inject(MessageService);
    spyOn(messageService, 'add');

    component.onLogin({ email: '', password: '' });

    expect(authService.login).toHaveBeenCalledWith('', '');
    expect(messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({ severity: 'error' }));
    expect(component.isLoading).toBe(false);
  });
});
