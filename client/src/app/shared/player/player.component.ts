import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {Action, Store} from '@ngrx/store';
import {map, Subscription, take} from 'rxjs';
import {Audiotrack} from 'src/app/features/audiotracks/audiotrack.model';
import {AppState} from 'src/app/store/app.reducer';
import {Actions, ofType} from "@ngrx/effects";
import * as PlayerActions from "../player/store/player.actions";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  private _apiBase = "http://localhost:5000";
  private audio: HTMLAudioElement;
  private playerSubscription: Subscription;
  private actions: Subscription;
  public audiotrack: Audiotrack | null;
  public volume: number;
  public currentMoment: number;
  public duration: number;
  public pause: boolean;

  ngOnDestroy(): void {
    this.actions.unsubscribe();
    this.playerSubscription.unsubscribe();
  }

  ngOnInit(): void {
   this.actions = this.actions$.pipe(
     ofType(PlayerActions.setAudio),
     map(() => {
       this.configureAudio();
     })
   ).subscribe();
  }

  constructor(private store: Store<AppState>,
              private actions$: Actions) {
    this.playerSubscription = this.store.select('player').subscribe(state => {
        this.audiotrack = state.activeTrack;
        this.volume = state.volume;
        this.pause = state.pause;
        this.duration = state.duration;
        this.currentMoment = state.currentMoment;
      }
    );
  }

  ngAfterViewInit(): void {
    if (!this.audio) {
      this.audio = new Audio();
    }
    this.configureAudio();
  }

  configureAudio(): void {
    if (this.audiotrack) {
      this.audio.src = this._apiBase + "/" + this.audiotrack.audioPath;
    }
    this.audio.volume = this.volume / 100;

    this.audio.onloadedmetadata = () => {
      this.store.dispatch(PlayerActions.setDuration({duration: Math.ceil(this.audio.duration)}));
    }

    this.audio.ontimeupdate = () => {
      this.store.dispatch(PlayerActions.setCurrentMoment({currentMoment: Math.ceil(this.audio.currentTime)}))
    }

    this.audio.play();
  }

  switchPlay(): void {
    if (this.pause) {
      this.store.dispatch(PlayerActions.play());
      this.audio.play();
    } else {
      this.store.dispatch(PlayerActions.pause());
      this.audio.pause();
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
