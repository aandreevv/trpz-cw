import {Audiotrack} from "../../../features/audiotracks/audiotrack.model";
import {Action, createReducer, on} from "@ngrx/store";
import * as PlayerActions from "./player.actions";
import {Playlist} from "../../../features/playlists/playlist.model";

export interface State {
  activeTrack: null | Audiotrack;
  volume: number;
  duration: number;
  pause: boolean;
  currentMoment: number;
  activePlaylist: null | Playlist,
  repeat: null | Audiotrack
}

const initialState: State = {
  activeTrack: null,
  volume: 50,
  duration: 0,
  pause: false,
  currentMoment: 0,
  activePlaylist: null,
  repeat: null
}

const _playerReducer = createReducer(
  initialState,
  on(PlayerActions.play, (state) => {
    return {
      ...state,
      pause: false
    }
  }),
  on(PlayerActions.pause, (state) => {
    return {
      ...state,
      pause: true
    }
  }),
  on(PlayerActions.setAudio, (state, action) => {
    return {
      ...state,
      activeTrack: action.audiotrack,
      duration: 0,
      currentMoment: 0
    }
  }),
  on(PlayerActions.setVolume, (state, action) => {
    return {
      ...state,
      volume: action.volume
    }
  }),
  on(PlayerActions.setDuration, (state, action) => {
    return {
      ...state,
      duration: action.duration
    }
  }),
  on(PlayerActions.setCurrentMoment, (state, action) => {
    return {
      ...state,
      currentMoment: action.currentMoment
    }
  }),
  on(PlayerActions.reset, () => {
    return {
      ...initialState
    }
  }),
  on(PlayerActions.setActivePlaylist, (state, action) => {
    return {
      ...state,
      activePlaylist: action.playlist,
      repeat: null
    }
  }),
  on(PlayerActions.repeat, (state, action) => {
    return {
      ...state,
      repeat: action.audiotrack
    }
  })
)

export function playerReducer(state: State | undefined, action: Action) {
  return _playerReducer(state, action);
}
