import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './person';
import { Message } from './message';


@Injectable({
  providedIn: 'root'
})
export class UserService {
	
	private userUrl = 'http://localhost:3000/user';
	private onlineUserUrl = 'http://localhost:3000/online';
	user: Person;
	messages: Message[];
	person: Person = {
    id: null,
    name: null,
    online: null
  };
	setUser(userName): Person{
		this.person.name = userName.text;
	  this.user = this.person;
	  return this.user;
	}

	getUser(): Person{
  	return this.user;
	}

	getUserFromServer(name: string): Observable<Message[]> {
		let url = `${this.userUrl}?name=${name}`
		return this.http.get<Message[]>(url)
	}

	getOnlineUsers(): Observable<any[]> {
		return this.http.get<[]>(this.onlineUserUrl)
	}

	exitUser(): void {
		this.user = null;
	}

  constructor(private http: HttpClient) { }
}
