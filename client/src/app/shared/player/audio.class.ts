import {PlayCommand} from "./command/play.command";
import { SourceCommand } from "./command/source.command";
import {PauseCommand} from "./command/pause.command";
import {VolumeCommand} from "./command/volume.command";
import {TimeCommand} from "./command/time.command";

export class AudioElement {
  private static _instance: AudioElement;
  private audio: HTMLAudioElement = new Audio();

  constructor() {}

  getInstance(): AudioElement {
    if(!AudioElement._instance) {
      AudioElement._instance = new AudioElement();
    }
    return AudioElement._instance;
  }

  getAudio(): HTMLAudioElement {
    return this.audio;
  }

  play(): void {
    const play: PlayCommand = new PlayCommand(this.audio);
    play.execute();
  }

  setSrc(src: string): void {
    const source: SourceCommand = new SourceCommand(this.audio, src);
    source.execute();
  }

  pause(): void {
    const pause: PauseCommand = new PauseCommand(this.audio);
    pause.execute();
  }

  setVolume(value: number): void {
    const volume: VolumeCommand = new VolumeCommand(this.audio, value);
    volume.execute();
  }

  setCurrentMoment(value: number): void {
    const time: TimeCommand = new TimeCommand(this.audio, value);
    time.execute();
  }
}
