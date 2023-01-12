import {Action, createReducer, on} from "@ngrx/store";
import { Playlist } from "../playlist.model";
import * as PlaylistActions from "./playlists.actions";

export interface State {
  playlists: Playlist[],
}

const initialState: State = {
  playlists: [],
};

const _playlistsReducer = createReducer(
  initialState,
  on(PlaylistActions.setPlaylists, (state, action) => {
    return {
      ...state,
      playlists: [...action.playlists]
    }
  }),

  on(PlaylistActions.shuffle, (state, action) => {
    return {
      ...state,
      playlists: state.playlists.map(playlist => {
        if (playlist.id === action.playlist.id) {
          return {...playlist, audios: [...playlist.audios].sort(() => Math.random() - 0.5)};
        }
        return playlist;
      })
    }
  })
)

export function playlistsReducer(state: State | undefined, action: Action) {
  return _playlistsReducer(state, action);
}
