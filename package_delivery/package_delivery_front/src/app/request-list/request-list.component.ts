import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-request-list',
  standalone: true,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss',
  imports: [HeaderComponent],
})
export class RequestListComponent {}
