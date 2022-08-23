import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor(private http: HttpClient) {}

  getUsers(optionalParams: string) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/users?${optionalParams}`
    );
  }
}
