import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/components/icon.component';
import { Router, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { TUser } from 'src/app/types/user.type';
import { IGetAllUsersGQL } from 'src/app/types/gql.types';
import { GET_ALL_USERS } from './users.gql';
import { UsersService } from './users.service';
import { UserFormComponent } from 'src/app/components/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, IconComponent, RouterModule, UserFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="row" *ngIf="users$ | async as users">
      <div class="col-sm-6 col-md-4">
        <div class="list-group mb-2">
          <button class="btn btn-outline-primary" (click)="isNewTrigger()">
            <app-icon icon="bi bi-plus" />
            Добавить
          </button>
        </div>

        <div class="list-group mb-2">
          <a
            *ngFor="let user of users"
            [routerLink]="[user.id]"
            class="list-group-item list-group-item-action"
            (click)="isNew = false"
          >
            {{ user.name }}
          </a>
        </div>

        <ng-container *ngIf="users.length === 0">
          <div class="list-group mb-2">
            <div class="alert alert-danger text-center">Нет пользователей</div>
          </div>
        </ng-container>
      </div>
      <div class="col-sm-6 col-md-8 col-lg-9">
        <ng-container *ngIf="!isNew">
          <router-outlet />
        </ng-container>
        <ng-container *ngIf="isNew">
          <app-user-form (onSubmit)="onSubmit($event)" />
        </ng-container>
      </div>
    </div>
  `,
})
export class UsersComponent implements OnInit {
  users$?: Observable<TUser[]>;
  isNew: boolean = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getAllUsers();
  }

  isNewTrigger() {
    this.isNew = !this.isNew;
  }

  onSubmit(user: TUser) {
    const { email, name } = user;
    this.usersService.createUser(name, email).subscribe((user) => {
      if (user) {
        this.isNewTrigger();
        this.router.navigate(['/users', user.id]);
      }
    });
  }
}
