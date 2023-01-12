import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from "../playlist.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as PlaylistActions from "../store/playlists.actions";
import * as PlayerActions from "../../../shared/player/store/player.actions";

@Component({
  selector: 'app-playlist-list-item',
  templateUrl: './playlist-list-item.component.html',
  styleUrls: ['./playlist-list-item.component.scss']
})
export class PlaylistListItemComponent implements OnInit {
  @Input() playlist: Playlist;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.store.dispatch(PlaylistActions.deletePlaylist({id: this.playlist.id}));
  }

  redirect(): void {
    this.router.navigate([this.playlist.id], {relativeTo: this.route})
  }

  setActive(): void {
    this.store.dispatch(PlayerActions.setActivePlaylist({playlist: this.playlist}))
  }
}
