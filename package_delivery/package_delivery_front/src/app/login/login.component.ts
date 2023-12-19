import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HeaderComponent]
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
      (response) => {
        console.log('authentication succcessful', response);

        const usernameValue = this.profileForm.get('username')!.value;
        
        sessionStorage.setItem('username', usernameValue!);
        
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Authentication failed', error);
      }
    );
  }
}
