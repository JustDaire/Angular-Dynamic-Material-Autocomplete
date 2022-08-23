import { Component, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: any = [];
  selectedUser: any = {};

  constructor(private commonS: CommonService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const params = '';
    this.commonS.getUsers(params).subscribe((data) => {
      console.log('Data:', data);
      this.users = data;
    });
  }

  setUser(user) {
    // Log the selected item
    console.log('Selected user:', user);
    // Add the selected item to parameter
    this.selectedUser = user;
  }
  clearInput(item) {
    // Resets selected item values
    this[item] = {};
  }
}
