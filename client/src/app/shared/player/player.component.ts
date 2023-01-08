import {Component, OnDestroy, OnInit} from '@angular/core';
import {Audiotrack} from "../../features/audiotracks/audiotrack.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import * as PlayerActions from "./store/player.actions";
import {map, Subscription} from "rxjs";
import {setDuration} from "./store/player.actions";
import {PlayerService} from "./player.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  private _apiBase = 'http://localhost:5000'
  private audio: HTMLAudioElement;


  volume: number;
  currentMoment: number = 0;
  duration: number;
  pause: boolean;

  audiotrack: Audiotrack | null;
  playerSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private playerService: PlayerService) {
    this.audio = new Audio();
    this.audio.src = `${this._apiBase}/${this.audiotrack?.audioPath}`;
    this.audio.onloadedmetadata = () => {
      this.duration = Math.ceil(this.audio.duration);
    }
    this.audio.ontimeupdate = () => {
      this.currentMoment = Math.ceil(this.audio.currentTime)
    }
  }

  ngOnDestroy(): void {
    this.playerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.playerSubscription = this.store.select('player').subscribe(state => {
        this.pause = state.pause;
        this.volume = state.volume;
        this.audio.volume = state.volume / 100;
        this.audiotrack = state.activeTrack;
        this.audio.src = this.audiotrack?.audioPath
      }
    );
  }

  switchPlay(): void {
    if (!this.pause) {
      this.store.dispatch(PlayerActions.pause());
      this.audio.pause();
    } else {
      this.store.dispatch(PlayerActions.play());
      this.audio.play();
    }
  }

  changeCurrent(currentMoment: number): void {
    this.store.dispatch(PlayerActions.setCurrentMoment({currentMoment}));
    this.audio.currentTime = currentMoment;
  }

  changeVolume(volume: number): void {
    this.store.dispatch(PlayerActions.setVolume({volume}));
    this.audio.volume = volume / 100;
  }
}
