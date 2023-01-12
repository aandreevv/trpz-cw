import {Command} from "./command.interface";

export class PauseCommand implements Command {

  constructor(private audio: HTMLAudioElement) {
  }

  execute(): void {
    this.audio.pause();
  }
}
