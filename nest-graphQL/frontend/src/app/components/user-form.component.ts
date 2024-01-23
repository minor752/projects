import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TUser } from '../types/user.type';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  styles: [``],
  template: `
    <form [formGroup]="form" style="max-width: 20rem;">
      <div class="mb-3">
        <label for="name" class="form-label"> Имя </label>
        <input
          id="name"
          type="text"
          class="form-control"
          formControlName="name"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label"> Email </label>
        <input
          id="email"
          type="email"
          class="form-control"
          formControlName="email"
        />
      </div>
      <button
        class="btn btn-primary"
        (click)="submit()"
        [disabled]="form.invalid"
      >
        {{ btnTitle }}
      </button>
    </form>
  `,
})
export class UserFormComponent implements OnInit {
  @Input() user: TUser | null = null;
  @Output() onSubmit = new EventEmitter<TUser>();

  form: FormGroup = new FormGroup({});

  btnTitle?: string;

  constructor() {}

  ngOnInit() {
    this.btnTitle = this.user ? 'Редактировать' : 'Создать';
    this.form = new FormGroup({
      name: new FormControl(this.user?.name ?? '', [Validators.required]),
      email: new FormControl(this.user?.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  submit() {
    this.onSubmit.emit({
      ...this.form.value,
      id: this.user?.id,
    });
  }
}
