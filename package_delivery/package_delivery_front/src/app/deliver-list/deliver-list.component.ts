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

    this.http.get(getRequestURL).subscribe(
      (response: any) => {
        console.log('SQL query successful', response);

        this.listOfRequests = response.requests;
        this.listOfCreators = response.creators;

        console.log(this.listOfRequests);
        console.log(this.listOfCreators);
      },
      (error) => {
        console.error('SQL query failed', error);
      }
    );
  }

  getCreatorById(creator_id: number) {
    return this.listOfCreators.find((creator) => creator.id === creator_id);
  }

  removeAllRequests() {
    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/delivery/${id}/list`;
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

  statusUpdate(status: string, request_id: number) {
    const id: string = sessionStorage.getItem('id')!;
    const addRequestURL = `http://127.0.0.1:8000/delivery/${id}/list/${request_id}`;
    const status_dict = {
      status: status,
    };
    this.http.put(addRequestURL, status_dict).subscribe(
      (response: any) => {
        console.log('updated successfully', response);

        window.location.reload();
      },
      (error) => {
        console.error('problem', error);
      }
    );
  }

  removeRequest(request_id: number) {
    const id: string = sessionStorage.getItem('id')!;
    const updateRequestURL = `http://127.0.0.1:8000/delivery/${id}/list/${request_id}`;
    const data = {};
    this.http.delete(updateRequestURL, data).subscribe(
      (response: any) => {
        console.log('removed successfully', response);
        window.location.reload();
      },
      (error) => {
        console.error("didn't work", error);
      }
    );
  }
}
