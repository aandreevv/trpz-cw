import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as PlayerActions from "./player.actions";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Injectable()
export class PlayerEffects {
  constructor(private actions$: Actions) {
  }

}
