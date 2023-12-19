import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private router: Router, private http: HttpClient) {}

  signUpForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
  });

  onSubmit() {
    const credentials = this.signUpForm.value;
    console.log(credentials);

    const loginURL = 'http://127.0.0.1:8000/signup';
    this.http.post(loginURL, credentials).subscribe(
      (response) => {
        console.log('authentication succcessful', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Authentication failed', error);
      }
    );
  }
}
