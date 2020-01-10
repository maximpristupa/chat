import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Message } from './message';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const messages = [
		  {id: 1, text: 'Dr vcxNice', userName: 'Vika' },
		  {id: 1, text: 'Naasdfvbrco', userName: 'Max' },
		  {id: 1, text: 'Bombastsdfbo', userName: 'Valya' },
		  {id: 1, text: 'Celeritasdfbvs', userName: 'Max' },
		  {id: 1, text: 'Magnetsdfa', userName: 'Artyom' },
		  {id: 1, text: 'RubberMsdfban', userName: 'Artyom' },
		  {id: 1, text: 'Dyna df dma', userName: 'Yana' },
		  {id: 1, text: 'Dr IQ', userName: 'Olga' },
		  {id: 1, text: 'Magdsfbvcxc dsfbv fdvcma', userName: 'Max' },
		  {id: 1, text: 'Tornadfdbvcxdfg dsfvbc dsfv df o', userName: 'Max' },
		  {id: 1, text: 'test 21 Tornadfdbvcxdfg dsfvbc dsfv df o', userName: 'User123' }
	];
    return {messages};
  }

}
