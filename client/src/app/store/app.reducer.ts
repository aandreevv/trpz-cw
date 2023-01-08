import {ActionReducerMap} from "@ngrx/store";
import * as user from "../core/auth/store/user.reducer";
import * as audiotracks from "../features/audiotracks/store/audiotracks.reducer";
import * as player from "../shared/player/store/player.reducer";

export interface AppState {
  auth: user.State,
  audiotracks: audiotracks.State,
  player: player.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: user.userReducer,
  audiotracks: audiotracks.audiotracksReducer,
  player: player.playerReducer
}
