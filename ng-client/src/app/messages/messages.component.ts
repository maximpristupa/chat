import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { Person } from '../person';
import { UserService } from '../user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {


	user: Person;
	messages: Message[];
  constructor(private messageService: MessageService, private userService: UserService) { }

  getUser(): void {
	  this.user = this.userService.getUser();
	}

  getlastMessageTime(): any{
    let lastMessageTime = null;
    if (this.messages) {
      lastMessageTime = this.messages[this.messages.length - 1].createdAt;
    }
    return lastMessageTime;
  }

	getMessages(): void {
    let lastMessageTime = this.getlastMessageTime();
	  this.messageService.getMessages(lastMessageTime)
	    .subscribe(messages => lastMessageTime ? this.pushMessages(messages) : this.messages = messages);
	}

  pushMessages(newMessages): void {
    newMessages.forEach((message)=>{ this.messages.push(message) })
  }
  ngOnInit() {
  	this.getUser();
    this.getMessages();
    setInterval(() => this.getMessages(), 3000);
  }

  add(text: string): void {
	  text = text.trim();
    let userName = this.user.name;
    let createdAt = `${Date.now()}`;
    let lastMessageTime = this.getlastMessageTime();
	  if (!text) { return; }
	  this.messageService.addMessage({ text, userName, createdAt } as Message, lastMessageTime)
    	.subscribe(message => {
      	this.getMessages();
    	});
	}

}
