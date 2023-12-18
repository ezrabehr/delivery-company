import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { AuthComponent } from "./auth/auth.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ClientRequestsComponent } from "./client-requests/client-requests.component";
import { RequestListComponent } from "./request-list/request-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HeaderComponent, AuthComponent, HomePageComponent, ClientRequestsComponent, RequestListComponent]
})
export class AppComponent {
  title = 'package_delivery_front';
}
