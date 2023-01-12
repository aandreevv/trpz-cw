import {Command} from "./command.interface";
import {AudioElement} from "../audio.class";

export class TimeCommand implements Command {

  constructor(private audio: HTMLAudioElement,
              private currentMoment: number) {
  }

  execute(): void {
    this.audio.currentTime = this.currentMoment;
  }
}
