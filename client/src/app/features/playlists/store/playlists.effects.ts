import {Injectable} from "@angular/core";
import {PlaylistsService} from "../playlists.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as PlaylistActions from "./playlists.actions";
import {map, switchMap} from "rxjs";

@Injectable()
export class PlaylistsEffects {
  constructor(private actions$: Actions,
              private service: PlaylistsService) {
  }

  fetchPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.fetchPlaylists),
      switchMap(() => {
        return this.service.fetchPlaylists().pipe(
          map(playlists => {
            return PlaylistActions.setPlaylists(playlists);
          })
        )
      })
    )
  )

  createPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.createPlaylist),
      switchMap(action => {
        return this.service.createPlaylist(action.fd).pipe(
          map(playlists => {
            return PlaylistActions.setPlaylists(playlists);
          })
        )
      })
    )
  )

  deletePlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.deletePlaylist),
      switchMap(action => {
        return this.service.deletePlaylist(action.id).pipe(
          map(playlists => {
            return PlaylistActions.setPlaylists(playlists);
          })
        )
      })
    )
  )

  appendPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.appendPlaylist),
      switchMap(action => {
        return this.service.appendPlaylist(action.playlistId, action.audiotrackId).pipe(
          map(playlists => {
            return PlaylistActions.setPlaylists(playlists);
          })
        )
      })
    )
  )

  deleteAudio$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.deleteAudio),
      switchMap(action => {
        return this.service.deleteAudio(action.playlistId, action.audiotrackId).pipe(
          map(playlists => {
            return PlaylistActions.setPlaylists(playlists);
          })
        )
      })
    )
  )
}
