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
import { User } from '../interface';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HeaderComponent],
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) {}

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    const credentials = this.profileForm.value;
    console.log(credentials);

    const loginURL = 'http://127.0.0.1:8000/login';

    this.http.post(loginURL, credentials).subscribe(
      (response: any) => {
        console.log('authentication succcessful', response);

        sessionStorage.setItem('username', response.user.username);
        sessionStorage.setItem('first_name', response.user.first_name);
        sessionStorage.setItem('last_name', response.user.last_name);
        sessionStorage.setItem('password', response.user.password);
        sessionStorage.setItem('phone_number', response.user.phone_number);
        sessionStorage.setItem('email', response.user.email);

        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Authentication failed', error);
      }
    );
  }
}
