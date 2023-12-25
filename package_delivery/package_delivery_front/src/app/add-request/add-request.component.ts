import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-request',
  standalone: true,
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
})
export class AddRequestComponent {
  constructor(private router: Router, private http: HttpClient) {}

  requestForm = new FormGroup({
    to: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    packageSize: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
  });

  async submitForm() {
    const request: any = this.requestForm.value;

    console.log(request);

    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/client/${id}/requests/`;

    try {
      const response = await fetch(addRequestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('authentication successful', responseData);

      this.router.navigate(['/my-requests']);
    } catch (error) {
      console.error('Authentication failed', error);
    }
  }
}
