import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ClientRequestsComponent } from './client-requests/client-requests.component';
import { RequestListComponent } from './request-list/request-list.component';
import { DeliverListComponent } from './deliver-list/deliver-list.component';
import { AddRequestComponent } from './add-request/add-request.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HomePageComponent,
    ClientRequestsComponent,
    RequestListComponent,
    DeliverListComponent,
    AddRequestComponent,
  ],
})
export class AppComponent {
  title = 'package_delivery_front';
}