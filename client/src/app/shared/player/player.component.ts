import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit,} from '@angular/core';

import {Store} from '@ngrx/store';
import {map, Subscription} from 'rxjs';
import {Audiotrack} from 'src/app/features/audiotracks/audiotrack.model';
import {AppState} from 'src/app/store/app.reducer';
import {Actions, ofType} from "@ngrx/effects";
import * as PlayerActions from "../player/store/player.actions";
import {Playlist} from "../../features/playlists/playlist.model";
import {AudiotracksIterator} from "./iterator/audiotracks.iterator";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  private _apiBase = "http://localhost:5000";
  private activePlaylist: Playlist | null;
  private audio: HTMLAudioElement;
  private playerSubscription: Subscription;
  private playlistSubscription: Subscription;
  private audioSubscription: Subscription;
  private repeatSubscription: Subscription;
  public audiotrack: Audiotrack | null;
  public volume: number;
  public currentMoment: number;
  public duration: number;
  public pause: boolean;
  public audiotracksIterator: AudiotracksIterator | null;
  public repeatTrack: Audiotrack | null;

  ngOnDestroy(): void {
    this.audioSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
    this.playlistSubscription.unsubscribe();
  }

  ngOnInit(): void {
   this.audioSubscription = this.actions$.pipe(
     ofType(PlayerActions.setAudio),
     map(() => {
       this.configureAudio();
     })
   ).subscribe();

   this.playlistSubscription = this.actions$.pipe(
     ofType(PlayerActions.setActivePlaylist),
     map(() => {
       this.configurePlaylist();
     })
   ).subscribe();

   this.repeatSubscription = this.actions$.pipe(
     ofType(PlayerActions.repeat),
     map(() => {
       this.configureRepeat();
     })
   ).subscribe()
  }

  constructor(private store: Store<AppState>,
              private actions$: Actions,
              private cdr: ChangeDetectorRef) {
    this.playerSubscription = this.store.select('player').subscribe(state => {
        this.audiotrack = state.activeTrack;
        this.volume = state.volume;
        this.pause = state.pause;
        this.duration = state.duration;
        this.currentMoment = state.currentMoment;
        this.activePlaylist = state.activePlaylist;
        this.repeatTrack = state.repeat;
      }
    );
  }

  ngAfterViewInit(): void {
    if (!this.audio) {
      this.audio = new Audio();
    }
    if (this.activePlaylist) {
      this.configurePlaylist();
    } else {
      this.configureAudio();
    }
    this.cdr.detectChanges();
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
      if (this.currentMoment === this.duration && this.duration !== 0) {
        if (this.activePlaylist) {
          this.next();
        }
        if (this.repeatTrack) {
          this.store.dispatch(PlayerActions.setAudio({audiotrack: this.repeatTrack}))
        }
      }
    }

    this.audio.play();
  }

  configurePlaylist(): void {
    if (this.activePlaylist) {
      this.audiotracksIterator = new AudiotracksIterator(this.activePlaylist.audios);
    }
    this.next();
  }

  configureRepeat(): void {
    this.activePlaylist = null;
    this.audiotracksIterator = null;
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

  next(): void {
    if (this.audiotracksIterator?.hasNext()) {
      const audiotrack: Audiotrack = this.audiotracksIterator.next();
      this.store.dispatch(PlayerActions.setAudio({audiotrack}));
      this.store.dispatch(PlayerActions.play());
    }
  }

  repeat(): void {
    if (this.audiotrack) {
      this.store.dispatch(PlayerActions.repeat({audiotrack: this.audiotrack}));
    }
  }
}
