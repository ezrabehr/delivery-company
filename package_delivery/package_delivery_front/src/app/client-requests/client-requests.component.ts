import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserMini } from '../interface';

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

  async ngOnInit(): Promise<void> {
    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/client/${id}/requests/`;

    try {
      const response = await fetch(addRequestURL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('SQL query successful', responseData);

      this.listOfRequests = responseData.client_requests;
      this.client = responseData.client;

      console.log('list: ' + this.listOfRequests);

      if(this.listOfRequests.length == 0){
        console.log('in');
        
      }
    } catch (error) {
      console.error('SQL query failed', error);
      window.location.reload();
    }
  }

  async removeAllRequests() {
    const id: string = sessionStorage.getItem('id')!;
    const deleteRequestURL = `http://127.0.0.1:8000/client/${id}/requests/`;

    try {
      const response = await fetch(deleteRequestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('deleted successfully', responseData);

      window.location.reload();
    } catch (error) {
      console.error('problem', error);
      window.location.reload();
    }
  }

  async removeRequest(request_id: number) {
    const id: string = sessionStorage.getItem('id')!;
    const deleteRequestURL = `http://127.0.0.1:8000/client/${id}/requests/${request_id}`;

    try {
      const response = await fetch(deleteRequestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('deleted successfully', responseData);

      window.location.reload();
    } catch (error) {
      console.error('problem', error);
      window.location.reload();
    }
  }
}
