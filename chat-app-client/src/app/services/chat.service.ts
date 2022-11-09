import {Injectable, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
// import { io, Socket } from 'socket.io-client';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{


  // private socket: Socket;
  // private url = 'http://localhost:3000'; // your server local path

  constructor() {
    // this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }


  ngOnInit():void {
  }



}
