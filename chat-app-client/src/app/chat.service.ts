import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket:Socket;
  private url = 'https://localhost:3000';


  constructor() {
    this.socket = io(this.url);
  }

  joinChatRoom(data): void{
    this.socket.emit('join',data);

  }

  sendMessage(data): void{
    this.socket.emit('message',data);
  }
}
