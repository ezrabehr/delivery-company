import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Requests, User } from '../interface';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deliver-list',
  standalone: true,
  templateUrl: './deliver-list.component.html',
  styleUrl: './deliver-list.component.scss',
  imports: [HeaderComponent, CommonModule],
})
export class DeliverListComponent implements OnInit {
  listOfRequests: Requests[] = [];

  listOfCreators: User[] = [];

  async ngOnInit(): Promise<void> {
    const deliverId: string = sessionStorage.getItem('id')!;
    const getDeliverListURL: string = `http://127.0.0.1:8000/delivery/${deliverId}/list`;

    fetch(getDeliverListURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('SQL query successful', data);

        this.listOfRequests = data.requests;
        this.listOfCreators = data.creators;
      })
      .catch((error) => {
        console.error('SQL query failed', error);
      });
  }

  getCreatorById(creatorId: number) {
    return this.listOfCreators.find((creator) => creator.id === creatorId);
  }

  async removeAllRequests(): Promise<void> {
    const deliverId: string = sessionStorage.getItem('id')!;
    const deleteAllRequestURL: string = `http://127.0.0.1:8000/delivery/${deliverId}/list`;

    fetch(deleteAllRequestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('deleted successfully', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('problem', error);
      });
  }

  async statusUpdate(status: string, requestId: number): Promise<void> {
    const deliverId: string = sessionStorage.getItem('id')!;
    const addRequestURL: string = `http://127.0.0.1:8000/delivery/${deliverId}/list/${requestId}`;
    const statusDict: object = { status };

    fetch(addRequestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusDict),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('updated successfully', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('problem', error);
      });
  }

  async removeRequest(requestId: number): Promise<void> {
    const deliverId: string = sessionStorage.getItem('id')!;
    const removeRequestURL: string = `http://127.0.0.1:8000/delivery/${deliverId}/list/${requestId}`;

    fetch(removeRequestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('removed successfully', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("didn't work", error);
      });
  }
}
