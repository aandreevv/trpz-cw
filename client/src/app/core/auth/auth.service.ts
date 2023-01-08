import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IResponseData } from './store/user.effects';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiBase = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<IResponseData>(`${this._apiBase}/login`, {
      email,
      password
    }, {
      withCredentials: true
    });
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post<IResponseData>(`${this._apiBase}/registration`, {
      username,
      email,
      password
    }, {
      withCredentials: true
    })
  }

  isAuthenticated() {
    return this.http.get<{
      status: string,
      user: IResponseData
    }>(`${this._apiBase}/authenticated`, {
      withCredentials: true
    })
  }

  logout() {
    return this.http.post<{ message: string }>(`${this._apiBase}/logout`, {},{
      withCredentials: true
    })
  }
}
