import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../interface';
@Component({
  selector: 'app-request-list',
  standalone: true,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss',
  imports: [HeaderComponent, CommonModule],
})
export class RequestListComponent implements OnInit {
  listOfRequests = [];

  listOfCreators: User[] = [];

  async ngOnInit(): Promise<void> {
    const deliverId: string = sessionStorage.getItem('id')!;
    const getRequestListURL = `http://127.0.0.1:8000/delivery/${deliverId}/requests`;

    try {
      const response = await fetch(getRequestListURL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('SQL query successful', responseData);

      this.listOfRequests = responseData.requests;
      this.listOfCreators = responseData.creators;
    } catch (error) {
      console.error('SQL query failed', error);
    }
  }

  getCreatorById(creatorId: number) {
    return this.listOfCreators.find((creator) => creator.id === creatorId);
  }

  async addRequest(requestId: number): Promise<void> {
    const deliverId: string = sessionStorage.getItem('id')!;
    const updateRequestURL = `http://127.0.0.1:8000/delivery/${deliverId}/request/${requestId}`;

    try {
      const response = await fetch(updateRequestURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('updated successfully', responseData);

      window.location.reload();
    } catch (error) {
      console.error("didn't work", error);
    }
  }
}
