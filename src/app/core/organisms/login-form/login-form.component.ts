import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  @Input() loading: boolean = false;

  @Output() submitLogin = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  isInvalid(formControl: AbstractControl | null): boolean {
    return formControl ? formControl.invalid && formControl.dirty : true;
  }

  submitForm() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.markAsPristine();
    this.submitLogin.emit({
      email: this.email?.value,
      password: this.password?.value,
    });
  }
}
