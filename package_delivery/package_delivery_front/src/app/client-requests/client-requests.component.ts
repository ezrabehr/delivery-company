import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User, UserMini } from '../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-requests',
  standalone: true,
  templateUrl: './client-requests.component.html',
  styleUrl: './client-requests.component.scss',
  imports: [HeaderComponent, CommonModule],
})
export class ClientRequestsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  listOfRequests = [];
  client: UserMini = {
    email: '',
    id: 0,
    phone_number: 0,
    username: '',
  };

  ngOnInit(): void {
    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/client/${id}/requests/`;

    this.http.get(addRequestURL).subscribe(
      (response: any) => {
        console.log('SQL query successful', response);

        this.listOfRequests = response.client_requests;
        this.client = response.client;

        console.log(this.listOfRequests);
      },
      (error) => {
        console.error('SQL query failed', error);
      }
    );
  }

  removeAllRequests() {
    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/client/${id}/requests/`;
    this.http.delete(addRequestURL).subscribe(
      (response: any) => {
        console.log('deleted successfully', response);

        window.location.reload();
      },
      (error) => {
        console.error('problem', error);
      }
    );
  }

  removeRequest(request_id: number) {
    const id: string = sessionStorage.getItem('id')!;

    const addRequestURL = `http://127.0.0.1:8000/client/${id}/requests/${request_id}`;
    this.http.delete(addRequestURL).subscribe(
      (response: any) => {
        console.log('deleted successfully', response);

        window.location.reload();
      },
      (error) => {
        console.error('problem', error);
      }
    );
  }
}
