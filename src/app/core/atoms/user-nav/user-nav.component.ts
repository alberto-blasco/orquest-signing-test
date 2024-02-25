import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [AvatarModule, MenuModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
})
export class UserNavComponent implements OnInit {
  menuItems: MenuItem[] | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const username = this.authService.getUser()?.name ?? '';

    this.menuItems = [
      {
        label: username,
        items: [
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.authService.signOut();
            },
          },
        ],
      },
    ];
  }
}
