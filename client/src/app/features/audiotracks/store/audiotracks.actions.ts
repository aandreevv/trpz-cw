import {createAction, props} from "@ngrx/store";
import {Audiotrack} from "../audiotrack.model";

export const fetchAudiotracks = createAction(
  "[Audiotracks] Fetch Audiotracks"
);

export const setAudiotracks = createAction(
  "[Audiotracks] Set Audiotracks",
  props<{audiotracks: Audiotrack[]}>()
)

export const addAudiotrack = createAction(
  "[Audiotracks] Create Audiotrack",
  props<{formData: FormData}>()
);

export const deleteAudiotrack = createAction(
  "[Audiotracks] Delete Audiotrack"
);
