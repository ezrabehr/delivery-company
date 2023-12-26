import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-request',
  standalone: true,
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
})
export class AddRequestComponent {
  constructor(private router: Router) {}

  addForm: FormGroup = new FormGroup({
    to: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    packageSize: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
  });

  async submitForm(): Promise<void> {
    const request: FormGroup = this.addForm.value;

    const clientId: string = sessionStorage.getItem('id')!;
    const addRequestURL: string = `http://127.0.0.1:8000/client/${clientId}/requests`;

    try {
      const response: Response = await fetch(addRequestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData : object = await response.json();
      console.log('authentication successful', responseData);

      this.router.navigate(['/my-requests']);
    } catch (error) {
      console.error('Authentication failed', error);
    }
  }
}
