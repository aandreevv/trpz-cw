import {createAction, props} from "@ngrx/store";
import {Playlist} from "../playlist.model";

export const fetchPlaylists = createAction(
  "[Playlists] Fetch Playlists"
)

export const setPlaylists = createAction(
  "[Playlists] Set Playlists",
  props<{playlists: Playlist[]}>()
)

export const createPlaylist = createAction(
  "[Playlists] Create Playlist",
  props<{fd: FormData}>()
)

export const deletePlaylist = createAction(
  "[Playlists] Delete Playlist",
  props<{id: number}>()
)

export const appendPlaylist = createAction(
  "[Playlists] Append Playlist",
  props<{playlistId: number, audiotrackId: number}>()
)

export const deleteAudio = createAction(
  "[Playlists] Delete Audio",
  props<{playlistId: number, audiotrackId: number}>()
)

export const shuffle = createAction(
  "[Playlists] Shuffle",
  props<{playlist: Playlist}>()
)
