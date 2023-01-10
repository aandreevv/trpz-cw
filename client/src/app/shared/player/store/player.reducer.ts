import {Audiotrack} from "../../../features/audiotracks/audiotrack.model";
import {Action, createReducer, on} from "@ngrx/store";
import * as PlayerActions from "./player.actions";

export interface State {
  activeTrack: null | Audiotrack;
  volume: number;
  duration: number;
  pause: boolean;
  currentMoment: number;
}

const initialState: State = {
  activeTrack: null,
  volume: 50,
  duration: 0,
  pause: true,
  currentMoment: 0
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
  on(PlayerActions.reset, state => {
    return {
      ...initialState
    }
  })
)

export function playerReducer(state: State | undefined, action: Action) {
  return _playerReducer(state, action);
}
