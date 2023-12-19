import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-client-requests',
    standalone: true,
    templateUrl: './client-requests.component.html',
    styleUrl: './client-requests.component.scss',
    imports: [HeaderComponent]
})
export class ClientRequestsComponent {

}
