import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-add-request',
    standalone: true,
    templateUrl: './add-request.component.html',
    styleUrl: './add-request.component.scss',
    imports: [HeaderComponent]
})
export class AddRequestComponent {

}
