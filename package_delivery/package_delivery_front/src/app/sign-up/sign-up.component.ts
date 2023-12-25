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
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HeaderComponent],
})
export class SignUpComponent {
  constructor(private router: Router) {}

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

  async onSubmit() {
    const credentials = this.signUpForm.value;

    const signUpURL = 'http://127.0.0.1:8000/signup';

    try {
      const response = await fetch(signUpURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('authentication successful', responseData);

      const user = responseData.user;

      sessionStorage.setItem('username', user.username);
      sessionStorage.setItem('first_name', user.first_name);
      sessionStorage.setItem('last_name', user.last_name);
      sessionStorage.setItem('password', user.password);
      sessionStorage.setItem('phone_number', user.phone_number);
      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('userType', user.role);
      sessionStorage.setItem('id', user.id);
      sessionStorage.setItem('role', user.role);

      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Authentication failed', error);
    }
  }
}
