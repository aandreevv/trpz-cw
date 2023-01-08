import {createAction, props} from "@ngrx/store";
import {Audiotrack} from "../../../features/audiotracks/audiotrack.model";

export const play = createAction(
  "[Player] Play"
)

export const pause = createAction(
  "[Player] Pause"
)

export const setAudio = createAction(
  "[Player] Set Audio",
  props<{audiotrack: Audiotrack}>()
)

export const setVolume = createAction(
  "[Player] Set Volume",
  props<{volume: number}>()
);

export const setDuration = createAction(
  "[Player] Set Duration",
  props<{duration: number}>()
);

export const setCurrentMoment = createAction(
  "[Player] Set Current Moment",
  props<{currentMoment: number}>()
);
