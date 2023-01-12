import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {Playlist} from "./playlist.model";
import {Actions, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import * as PlaylistActions from "../playlists/store/playlists.actions";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsResolver implements Resolve<{ playlists: Playlist[] }> {
  constructor(private actions$: Actions,
              private store: Store<AppState>) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ playlists: Playlist[] }> {
    return this.store.select("playlists").pipe(
      take(1),
      map(playlistsState => {
        return playlistsState.playlists;
      }),
      switchMap(playlists => {
        if (playlists.length === 0) {
          this.store.dispatch(PlaylistActions.fetchPlaylists());
          return this.actions$.pipe(
            ofType(PlaylistActions.setPlaylists),
            take(1)
          );
        } else {
          return of({playlists});
        }
      })
    )
  }
}
