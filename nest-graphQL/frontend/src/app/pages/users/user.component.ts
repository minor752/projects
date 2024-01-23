import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IconComponent } from 'src/app/components/icon.component';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { TUser } from 'src/app/types/user.type';
import { readMultipartBody } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFormComponent } from 'src/app/components/user-form.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, IconComponent, UserFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .card-width {
        width: 20rem;
      }
    `,
  ],
  template: `
    <div class="card p-2 card-width" *ngIf="data$ | async as data">
      <ng-container *ngIf="data && !data.loading && !isChange">
        <img class="card-img-top" [src]="imgSrc" />
        <div class="card-body">
          <h5 class="card-title">{{ data.user.name }}</h5>
          <p class="card-text">{{ data.user.email }}</p>
          <div class="alert alert-warning">
            <span class="text-mute">
              Создан {{ data.user.createdAt | date : 'dd.MM.yyyy HH:mm' }}
            </span>
            <br />
            <span class="text-mute">
              Обновлен {{ data.user.updatedAt | date : 'dd.MM.yyyy HH:mm' }}
            </span>
          </div>
          <div class="row">
            <div class="col-6 text-center">
              <button class="btn btn-outline-secondary" (click)="change()">
                <app-icon icon="bi bi-pencil-square" />
                Изменить
              </button>
            </div>
            <div class="col-6 text-center">
              <button
                class="btn btn-outline-danger"
                (click)="delete(data.user.id)"
              >
                <app-icon icon="bi bi-trash" />
                Удалить
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <ng-container *ngIf="data.loading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-success" role="status"></div>
        </div>
      </ng-container>
      <ng-container *ngIf="isChange">
        <button class="btn btn-sm btn-outline-info" (click)="change()">
          <app-icon icon="bi bi-arrow-left" />
          Назад
        </button>
        <app-user-form [user]="data.user" (onSubmit)="onSubmit($event)" />
      </ng-container>
    </div>
  `,
})
export class UserComponent implements OnInit {
  imgSrc =
    'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg';

  date?: Date = new Date();
  data$?: Observable<{ user: TUser; loading: boolean }>;
  isChange = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.data$ = this.usersService.getOneUser(id);
        this.cdr.detectChanges();
      }
    });
  }

  change() {
    this.isChange = !this.isChange;
  }

  delete(id: number) {
    if (confirm('Удалить пользователя?')) {
      this.usersService.deleteUser(id).subscribe((id) => {
        if (id) {
          this.router.navigate(['/users']);
        }
      });
    }
  }

  onSubmit(user: TUser) {
    const { name, email, id } = user;

    this.usersService.updateUser(id, name, email).subscribe((user) => {
      if (user) {
        this.change();
        // this.router.navigate(['/users', user.id]);
      }
    });
  }
}
