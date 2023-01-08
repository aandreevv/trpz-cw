import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import {map, Observable, skipWhile, take} from 'rxjs';
import * as App from "../../store/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<App.AppState>,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth').pipe(
      skipWhile(currentState => currentState.isLoading),
      take(1),
      map(authState => {
        return authState.user
      }),
      map(user => {
        return !!user ? true : this.router.createUrlTree(['/']);
      }),
    )
  }
}
