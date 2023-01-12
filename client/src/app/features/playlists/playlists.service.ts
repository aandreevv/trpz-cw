import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Playlist} from "./playlist.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private _apiBase = "http://localhost:5000/api/playlists";

  constructor(private http: HttpClient) {
  }

  fetchPlaylists() {
    return this.http.get<{ playlists: Playlist[] }>(`${this._apiBase}/user`, {
      withCredentials: true
    });
  }

  createPlaylist(fd: FormData) {
    return this.http.post<{playlists: Playlist[]}>(`${this._apiBase}`, fd,{
      withCredentials: true
    });
  }

  deletePlaylist(id: number) {
    return this.http.delete<{playlists: Playlist[]}>(`${this._apiBase}/${id}`, {
      withCredentials: true
    })
  }

  appendPlaylist(id: number, audioId: number) {
    return this.http.patch<{playlists: Playlist[]}>(`${this._apiBase}/${id}`, {audioId}, {
      withCredentials: true
    })
  }

  deleteAudio(id: number, audioId: number) {
    return this.http.delete<{playlists: Playlist[]}>(`${this._apiBase}/${id}/audio/${audioId}`, {
      withCredentials: true
    })
  }
}
