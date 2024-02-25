import { NgIf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { LanguageSelectorComponent } from '../../atoms/language-selector/language-selector.component';
import { UserNavComponent } from '../../atoms/user-nav/user-nav.component';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  imports: [ButtonModule, UserNavComponent, LanguageSelectorComponent, NgIf, AsyncPipe],
})
export class NavBarComponent implements OnInit {
  isUserAuthenticated: Observable<boolean> = of(false);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.state$;
  }
}
