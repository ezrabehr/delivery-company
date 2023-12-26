import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { ClientRequestsComponent } from './client-requests/client-requests.component';
import { RequestListComponent } from './request-list/request-list.component';
import { DeliverListComponent } from './deliver-list/deliver-list.component';
import { clientAuth, deliverAuth } from './auth-guard.guard';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomePageComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'add-request',
    component: AddRequestComponent,
    canActivate: [clientAuth],
  },
  {
    path: 'my-requests',
    component: ClientRequestsComponent,
    canActivate: [clientAuth],
  },
  {
    path: 'all-request',
    component: RequestListComponent,
    canActivate: [deliverAuth],
  },
  {
    path: 'my-deliveries',
    component: DeliverListComponent,
    canActivate: [deliverAuth],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
