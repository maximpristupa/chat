import { Injectable } from '@angular/core';
import { Message } from './message';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

	private messagesUrl = 'http://localhost:3000/messages';

	httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUrl(lastMessageTime: string): any{
		return lastMessageTime ? this.messagesUrl + `?lastmessagetime=${lastMessageTime}` : this.messagesUrl  	
  }
	
	getMessages(lastMessageTime: string): Observable<Message[]> {
		let url = this.getUrl(lastMessageTime);
	  return this.http.get<Message[]>(url, this.httpOptions)
	}

	getMessage(id: number): Observable<Message> {
	  const url = `${this.messagesUrl}/${id}`;
	  return this.http.get<Message>(url)
	}

	addMessage (message: Message, lastMessageTime: string): Observable<Message> {
		let url = this.getUrl(lastMessageTime);
	  return this.http.post<Message>(url, message, this.httpOptions)
	}

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
