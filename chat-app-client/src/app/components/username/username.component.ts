import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styles: [
  ]
})
export class UsernameComponent implements OnInit {

  @Output() userNameEvent = new EventEmitter<string>();

  userName = '';
  constructor() { }

  ngOnInit(): void {
  }


  setUserName(): void {
    this.userNameEvent.emit(this.userName);
  }

}
