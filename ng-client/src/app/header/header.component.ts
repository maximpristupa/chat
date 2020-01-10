import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Person } from '../person';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	user: Person;
  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.getUser();
  }

  getUser(): void {
	  this.user = this.userService.getUser();
	}

	exitUser(): void {
		this.userService.exitUser();
		this.user = null;
	}

}
