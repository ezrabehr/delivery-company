import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-deliver-list',
    standalone: true,
    templateUrl: './deliver-list.component.html',
    styleUrl: './deliver-list.component.scss',
    imports: [HeaderComponent]
})
export class DeliverListComponent {

}
