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

@Component({
  selector: 'app-add-request',
  standalone: true,
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss',
  imports: [HeaderComponent, ReactiveFormsModule],
})
export class AddRequestComponent {
  constructor(private router: Router, private http: HttpClient) {}

  requestForm = new FormGroup({
    to: new FormControl('', Validators.required),
    from: new FormControl('', Validators.required),
    packageSize: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
  });

  submitForm() {
    const request: any = this.requestForm.value;

    console.log(request);

    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/client/${id}/requests/`;

    this.http.post(addRequestURL, request).subscribe(
      (response: any) => {
        console.log('authentication succcessful', response);

        this.router.navigate(['/my-requests']);
      },
      (error) => {
        console.error('Authentication failed', error);
      }
    );
  }
}
