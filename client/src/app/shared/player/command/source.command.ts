import {Command} from "./command.interface";

export class SourceCommand implements Command {

  constructor(private audio: HTMLAudioElement,
              private source: string) {
  }

  execute(): void {
    this.audio.src = this.source;
  }
}
