import {Component, OnDestroy, OnInit} from '@angular/core';
import {Playlist} from "../playlist.model";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import {ActivatedRoute} from "@angular/router";
import * as PlaylistActions from "../store/playlists.actions";
import * as PlayerActions from "../../../shared/player/store/player.actions";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  private playlistsSubscription: Subscription;
  private routeSubscription: Subscription;
  playlist: Playlist;
  id: number;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
    this.routeSubscription = this.route.params.subscribe(parameters => this.id = parameters['id']);
    this.playlistsSubscription = this.store.select('playlists').subscribe(state => {
      this.playlist = state.playlists.find(playlist => playlist.id === +this.id) || new Playlist();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.playlistsSubscription.unsubscribe();
  }

  setActive(): void {
    this.store.dispatch(PlayerActions.setActivePlaylist({playlist: this.playlist}));
  }

  shuffle(): void {
    this.store.dispatch(PlaylistActions.shuffle({playlist: this.playlist}));
  }
}
