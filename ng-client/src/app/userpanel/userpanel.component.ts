import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Message } from '../message';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.scss']
})
export class UserpanelComponent implements OnInit {

  user: Person;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOnlineUsers();
    setInterval(() => this.getOnlineUsers(), 5000);
  }

  onlineUsers: any;
  getOnlineUsers(): void {
    this.userService.getOnlineUsers()
      .subscribe(users => this.onlineUsers = users);
  }

}
