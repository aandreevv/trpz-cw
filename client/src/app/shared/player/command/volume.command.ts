import {Command} from "./command.interface";

export class VolumeCommand implements Command {

  constructor(private audio: HTMLAudioElement,
              private volume: number) {
  }

  execute(): void {
    this.audio.volume = this.volume / 100;
  }
}
