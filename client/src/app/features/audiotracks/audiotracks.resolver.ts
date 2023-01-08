import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {map, Observable, of, switchMap, take} from 'rxjs';
import {Actions, ofType} from "@ngrx/effects";
import {AppState} from "../../store/app.reducer";
import { Store } from '@ngrx/store';
import * as AudiotracksActions from "./store/audiotracks.actions";
import {Audiotrack} from "./audiotrack.model";
import {logout} from "../../core/auth/store/user.actions";

@Injectable({
  providedIn: 'root'
})
export class AudiotracksResolver implements Resolve<{audiotracks: Audiotrack[]}> {
  constructor(private actions$: Actions,
              private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ audiotracks: Audiotrack[] }>
    | Promise<{ audiotracks: Audiotrack[] }> | { audiotracks: Audiotrack[] }{
    return this.store.select('audiotracks').pipe(
      take(1),
      map(audiotracksState => {
        return audiotracksState.audiotracks;
      }),
      switchMap(audiotracks => {
        if (audiotracks.length === 0) {
          this.store.dispatch(AudiotracksActions.fetchAudiotracks());
          return this.actions$.pipe(
            ofType(AudiotracksActions.setAudiotracks),
            take(1)
          );
        } else {
          return of({audiotracks});
        }
      })
    );
  }
}
