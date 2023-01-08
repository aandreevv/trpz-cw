import { Audiotrack } from "../audiotrack.model";
import * as AudiotracksActions from "./audiotracks.actions";
import {Action, createReducer, on} from "@ngrx/store";
import {act} from "@ngrx/effects";

export interface State {
  audiotracks: Audiotrack[]
}

const initialState: State = {
  audiotracks: []
}

const _audiotracksReducer = createReducer(
  initialState,
  on(AudiotracksActions.setAudiotracks, (state, action) => {
    return {
      ...state,
      audiotracks: [...action.audiotracks]
    }
  })
)

export function audiotracksReducer(state: State | undefined, action: Action) {
  return _audiotracksReducer(state, action);
}
