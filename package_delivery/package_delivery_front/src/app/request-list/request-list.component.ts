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
  constructor(private http: HttpClient) {}

  listOfRequests = [];

  listOfCreators: User[] = [];

  async ngOnInit(): Promise<void> {
    const id: string = sessionStorage.getItem('id')!;
    const getRequestURL = `http://127.0.0.1:8000/delivery/${id}/requests`;

    try {
      const response = await fetch(getRequestURL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('SQL query successful', responseData);

      this.listOfRequests = responseData.requests;
      this.listOfCreators = responseData.creators;

      console.log(this.listOfRequests);
      console.log(this.listOfCreators);
    } catch (error) {
      console.error('SQL query failed', error);
    }
  }

  getCreatorById(creator_id: number) {
    return this.listOfCreators.find((creator) => creator.id === creator_id);
  }

  async addRequest(request_id: number): Promise<void> {
    const id: string = sessionStorage.getItem('id')!;
    const updateRequestURL = `http://127.0.0.1:8000/delivery/${id}/request/${request_id}`;

    try {
      const response = await fetch(updateRequestURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // You can add data to send in the body if needed
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
