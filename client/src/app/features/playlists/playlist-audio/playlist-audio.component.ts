import {Component, Input, OnInit} from '@angular/core';
import {Audiotrack} from "../../audiotracks/audiotrack.model";
import * as PlayerActions from "../../../shared/player/store/player.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as PlaylistActions from "../store/playlists.actions";
@Component({
  selector: 'app-playlist-audio',
  templateUrl: './playlist-audio.component.html',
  styleUrls: ['./playlist-audio.component.scss']
})
export class PlaylistAudioComponent implements OnInit {
  @Input() audiotrack: Audiotrack;
  @Input() playlistId: number;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  setActive() {
    this.store.dispatch(PlayerActions.setAudio({audiotrack: this.audiotrack}));
    this.store.dispatch(PlayerActions.play());
  }

  delete() {
    this.store.dispatch(PlaylistActions.deleteAudio({playlistId: this.playlistId, audiotrackId: this.audiotrack.id}));
  }
}
