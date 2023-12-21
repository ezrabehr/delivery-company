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

  ngOnInit(): void {
    const id: string = sessionStorage.getItem('id')!;
    const getRequestURL = `http://127.0.0.1:8000/delivery/${id}/requests`;

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

  addRequest(request_id: number) {
    const id: string = sessionStorage.getItem('id')!;
    const updateRequestURL = `http://127.0.0.1:8000/delivery/${id}/request/${request_id}`;
    const data = {};
    this.http.put(updateRequestURL, data).subscribe(
      (response: any) => {
        console.log('updated successfully', response);
        window.location.reload()
      },
      (error) => {
        console.error("didn't work", error);
      }
    );
  }
}
