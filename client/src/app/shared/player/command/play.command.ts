import {Command} from "./command.interface";

export class PlayCommand implements Command {

  constructor(private audio: HTMLAudioElement) {
  }

  execute(): void {
    this.audio.play();
  }
}
