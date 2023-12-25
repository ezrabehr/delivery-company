import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { User } from '../interface';
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
  constructor(private http: HttpClient) {}

  listOfRequests = [];

  listOfCreators: User[] = [];

  ngOnInit(): void {
    const id: string = sessionStorage.getItem('id')!;
    const getRequestURL = `http://127.0.0.1:8000/delivery/${id}/list`;

    fetch(getRequestURL)
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

        console.log(this.listOfRequests);
        console.log(this.listOfCreators);
      })
      .catch((error) => {
        console.error('SQL query failed', error);
      });
  }

  getCreatorById(creator_id: number) {
    return this.listOfCreators.find((creator) => creator.id === creator_id);
  }

  removeAllRequests() {
    const id: string = sessionStorage.getItem('id')!;
    const deleteRequestURL = `http://127.0.0.1:8000/delivery/${id}/list`;

    fetch(deleteRequestURL, {
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
        window.location.reload();
      });
  }

  statusUpdate(status: string, request_id: number) {
    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/delivery/${id}/list/${request_id}`;
    const status_dict = { status };

    fetch(addRequestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(status_dict),
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
        window.location.reload();
      });
  }

  removeRequest(request_id: number) {
    const id: string = sessionStorage.getItem('id')!;
    const updateRequestURL = `http://127.0.0.1:8000/delivery/${id}/list/${request_id}`;

    fetch(updateRequestURL, {
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
        window.location.reload();
      });
  }
}
