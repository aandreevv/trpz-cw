import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AudiotracksService} from "../audiotracks.service";
import * as AudiotrackActions from "./audiotracks.actions";
import {map, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AudiotracksEffects {
  constructor(private actions$: Actions,
              private service: AudiotracksService,
              private router: Router) {  }

  fetchAudiotracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AudiotrackActions.fetchAudiotracks),
      switchMap(() => {
        return this.service.fetchAudiotracks().pipe(
          map(audiotracks => {
            return AudiotrackActions.setAudiotracks(audiotracks);
          })
        )
      })
    )
  )

  addAudiotrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AudiotrackActions.addAudiotrack),
      switchMap(action => {
        return this.service.addAudiotrack(action.formData).pipe(
          map(audiotracks => {
            return AudiotrackActions.setAudiotracks(audiotracks);
          }),
          tap(() => this.router.navigate(['/audiotracks']))
        )
      })
    )
  )
}
