import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [HeaderComponent, CommonModule]
})
export class HomePageComponent {
    userType: string | null = sessionStorage.getItem('userType');
}
