import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
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
  listOfRequests: Request[] = [];
  client: UserMini = {
    email: '',
    id: 0,
    phone_number: 0,
    username: '',
  };

  async ngOnInit(): Promise<void> {
    const clientId: string = sessionStorage.getItem('id')!;
    const getAllRequestURL: string = `http://127.0.0.1:8000/client/${clientId}/requests`;

    try {
      const response = await fetch(getAllRequestURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('SQL query successful', responseData);

      this.listOfRequests = responseData.client_requests;
      this.client = responseData.client;
    } catch (error) {
      console.error('SQL query failed', error);
    }
  }

  async removeAllRequests() {
    const clientId: string = sessionStorage.getItem('id')!;
    const deleteAllRequestURL = `http://127.0.0.1:8000/client/${clientId}/requests`;

    try {
      const response = await fetch(deleteAllRequestURL, {
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
    }
  }

  async removeRequest(requestId: number) {
    const clientId: string = sessionStorage.getItem('id')!;
    const deleteRequestURL = `http://127.0.0.1:8000/client/${clientId}/requests/${requestId}`;

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
    }
  }
}
