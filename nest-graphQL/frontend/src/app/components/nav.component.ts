import { Component } from '@angular/core';
import { IMenu } from '../types/menu.interface';

@Component({
  selector: 'app-nav',
  template: `
    <ul class="nav nav-pills mb-3">
      <li class="nav-item" *ngFor="let item of menu">
        <a
          class="nav-link"
          [routerLink]="item.href"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <app-icon [icon]="item.icon" /> 
          {{ item.title }}
        </a>
      </li>
    </ul>
  `,
})
export class NavComponent {
  menu?: IMenu[];

  constructor() {
    this.menu = [
      { id: 1, title: 'Главная', href: '/' },
      { id: 2, title: 'Пользователи', href: '/users', icon: 'bi bi-people' },
    ];
  }
}
