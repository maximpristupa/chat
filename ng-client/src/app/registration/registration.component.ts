import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Person } from '../person';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() { }

  setUser(text: string): void {
	  text = text.trim();
	  if (!text) { return; }
	  this.userService.setUser({ text });
	}


}
