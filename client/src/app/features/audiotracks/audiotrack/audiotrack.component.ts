import {Component, Input, OnInit} from '@angular/core';
import {Audiotrack} from "../audiotrack.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as PlayerActions from "../../../shared/player/store/player.actions";
import {Playlist} from "../../playlists/playlist.model";
import {Subscription} from "rxjs";
import * as PlaylistActions from "../../playlists/store/playlists.actions";

@Component({
  selector: 'app-audiotrack',
  templateUrl: './audiotrack.component.html',
  styleUrls: ['./audiotrack.component.scss']
})
export class AudiotrackComponent implements OnInit {
  @Input() audiotrack: Audiotrack;
  isPlaylistsOpen: boolean;
  playlists: Playlist[]
  private playlistSubscription: Subscription;

  constructor(private store: Store<AppState>) {
    this.playlistSubscription = this.store.select('playlists').subscribe(state => {
      this.playlists = state.playlists;
    });
  }

  ngOnInit(): void {
  }

  setActive() {
    this.store.dispatch(PlayerActions.setAudio({audiotrack: this.audiotrack}));
    this.store.dispatch(PlayerActions.play());
  }

  addToPlaylist(playlistId: number) {
    this.store.dispatch(PlaylistActions.appendPlaylist({playlistId, audiotrackId: this.audiotrack.id}));
    this.isPlaylistsOpen = false;
  }
}
