import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  logout() {
    sessionStorage.clear();
  }
  username: string | null = sessionStorage.getItem('username');
  userType: string = sessionStorage.getItem('userType')!;
}
