import {ActionReducerMap} from "@ngrx/store";
import * as user from "../core/auth/store/user.reducer";
import * as audiotracks from "../features/audiotracks/store/audiotracks.reducer";
import * as player from "../shared/player/store/player.reducer";
import * as playlists from "../features/playlists/store/playlists.reducer";

export interface AppState {
  auth: user.State,
  audiotracks: audiotracks.State,
  player: player.State,
  playlists: playlists.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: user.userReducer,
  audiotracks: audiotracks.audiotracksReducer,
  player: player.playerReducer,
  playlists: playlists.playlistsReducer
}
