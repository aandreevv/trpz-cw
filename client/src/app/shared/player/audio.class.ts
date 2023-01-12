export class AudioElement {
  private audio: HTMLAudioElement;

  private constructor() {
  }

  getInstance(): HTMLAudioElement {
    if (this.audio === null) {
      this.audio = new Audio();
    }
    return this.audio;
  }

  play(): void {
    this.audio.play()
  }

  setSrc(src: string): void {
    this.audio.src = src;
  }

  pause(): void {
    this.audio.pause();
  }
}
