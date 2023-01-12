import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from "./store/app.reducer";
import * as UserActions from "../app/core/auth/store/user.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'music';
  public showPlayer: boolean;
  private playerSubscription: Subscription;
  private playlistSubscription: Subscription;
  private isActivePlaylist: boolean;

  constructor(private store: Store<AppState>) {
    this.playerSubscription = this.store.select('player').subscribe(state => {
        this.showPlayer = !!state.activePlaylist || !!state.activeTrack;
      }
    )
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.initAuth())
  }

  ngOnDestroy(): void {
    this.playlistSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
  }

}
