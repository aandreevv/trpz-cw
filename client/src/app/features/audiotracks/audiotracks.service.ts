import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Audiotrack} from "./audiotrack.model";

@Injectable({
  providedIn: 'root'
})
export class AudiotracksService {
  private _apiBase = "http://localhost:5000/api/audio"

  constructor(private http: HttpClient) { }

  fetchAudiotracks() {
    return this.http.get<{audiotracks: Audiotrack[]}>(this._apiBase, {
      withCredentials: true
    });
  }

  addAudiotrack(formData: FormData) {
    return this.http.post<{audiotracks: Audiotrack[]}>(this._apiBase, formData, {
      withCredentials: true
    })
  }
}
