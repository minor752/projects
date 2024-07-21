import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AddPageComponent} from './add-page/add-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {OrdersPageComponent} from './orders-page/orders-page.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {authGuard} from "../shared/guard/auth.guard";
import { QuillModule } from 'ngx-quill'
import { SearchPipe } from '../shared/pipes/search.pipe';

const router: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/admin/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add',
        component: AddPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'orders',
        component: OrdersPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'product/:id/edit',
        component: EditPageComponent,
        canActivate: [authGuard]
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent,
    SearchPipe
  ],
  providers: [AuthService],
})
export class AdminModule {
}
