import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }
}
