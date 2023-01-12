import {Component, OnDestroy, OnInit} from '@angular/core';
import {Playlist} from "./playlist.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {
  private playlistsSubscription: Subscription;
  public playlists: Playlist[];

  constructor(private store: Store<AppState>) {
    this.playlistsSubscription = this.store.select('playlists').subscribe(state => {
      this.playlists = state.playlists
    });
  }

  ngOnDestroy(): void {
    this.playlistsSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
