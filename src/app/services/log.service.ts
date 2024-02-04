import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  messages: string[] = [];

  constructor() {}

  add(message: string) {
    this.messages.push(message);
  }
}
