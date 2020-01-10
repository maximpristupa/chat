import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Message } from '../message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: Person;
  messages: Message[];
  constructor(  
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getUser();
    this.getOnlineUsers();
  }

  getUser(): void {
    const name = this.route.snapshot.paramMap.get('username');
    this.userService.getUserFromServer(name)
      .subscribe(messages => this.messages = messages);
  }

  onlineUser(user: string): boolean {
    return this.onlineUsers.includes(user);
  }

  onlineUsers: any;
  getOnlineUsers(): void {
    this.userService.getOnlineUsers()
      .subscribe(users => this.onlineUsers = users);
  }

}
