import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent implements OnInit {
  menuItems: MenuItem[] | undefined;
  languageFlag: string = '';

  // constructor(private translateService);

  ngOnInit(): void {
    const currentLanguage = 'es';
    const secondaryLanguage = currentLanguage === 'es' ? 'en' : 'es';
    this.languageFlag = `assets/icons/${currentLanguage}.svg`;

    this.menuItems = [
      {
        label: `<img src="assets/icons/${secondaryLanguage}.svg" alt="Cambiar idioma" width="30px" height="30px" />`,
        escape: false,
        command: () => this.changeLanguage(secondaryLanguage),
      },
    ];
  }

  changeLanguage(language: string) {
    console.log('updating language to ', language);
  }
}
