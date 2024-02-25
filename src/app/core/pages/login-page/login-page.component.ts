import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

import { LoginFormComponent } from '../../organisms/login-form/login-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  imports: [LoginFormComponent],
})
export class LoginPageComponent {
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  onLogin({ email, password }: { email: string; password: string }): void {
    this.isLoading = true;
    this.authService.login(email, password).subscribe({
      next: status => (status === 'OK' ? this.submitted() : this.submitError()),
      complete: () => (this.isLoading = false),
      error: () => {
        this.isLoading = false;
        this.submitError();
      },
    });
  }

  private submitted(): void {
    this.messageService.add({ severity: 'success', summary: 'Genial!', detail: 'Inicio de sesión correcto' });
  }

  private submitError(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo iniciar sesión' });
  }
}
