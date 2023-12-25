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
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HeaderComponent],
})
export class LoginComponent {
  constructor(private router: Router) {}
  errorRise: boolean = false;
  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async onSubmit() {
    const credentials = this.profileForm.value;

    const loginURL = 'http://127.0.0.1:8000/login';

    try {
      const response = await fetch(loginURL, {
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
      this.errorRise = true;
      console.error('Authentication failed', error);
    }
  }
}
