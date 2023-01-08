import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of, switchMap, tap, throwError} from "rxjs";
import { AuthService } from "../auth.service";
import * as UserActions from "./user.actions";
import {User} from "../user.model";

export interface IResponseData {
  id: string,
  username: string,
  email: string,
}


const errorHandler = (errorResponse: any) => {
  let errorMessage = "Oops! An unknown error occurred!";
  if (errorResponse.error) {
    switch (errorResponse.error.message) {
      case "EMAIL_EXISTS": {
        errorMessage = "Oops! The user with such email is already exists!"
        break;
      }
      case "USER_NOT_EXISTS": {
        errorMessage = "Oops! The user with such email was not found!";
        break;
      }
      case "INVALID_PASSWORD": {
        errorMessage = "Oops! The password is incorrect!";
        break;
      }
    }
  }
  return of(UserActions.authFail({errorMessage, redirect: false}));
}

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.startLogin),
      mergeMap(action => {
        return this.authService.login(action.email, action.password).pipe(
          map(res => {
            return UserActions.authSuccess({
              id: res.id,
              username: res.username,
              email: res.email,
              redirect: true
            })
          })
        )
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.startSignUp),
      switchMap(action => {
        return this.authService.signUp(action.username, action.email, action.password).pipe(
          map(res => {
            return UserActions.authSuccess({
              id: res.id,
              username: res.username,
              email: res.email,
              redirect: true
            })
          }),
          catchError(error => {
            return errorHandler(error);
          })
        )
      })
    )
  );

  successRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.authSuccess),
        tap(action => action.redirect && this.router.navigate(['/']))
      ), {
      dispatch: false
    }
  );

  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logoutSuccess),
      tap(() => this.router.navigate(['/']))
    )
  );

  failRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.authFail, UserActions.autoFail),
        tap(action => action.redirect && this.router.navigate(['/auth']))
      ), {
      dispatch: false
    }
  );

  authInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.initAuth),
      switchMap(() => {
        return this.authService.isAuthenticated().pipe(
          map(res => {
            if (res.status === "Authenticated") {
              return UserActions.authSuccess({
                id: res.user.id,
                email: res.user.email,
                username: res.user.username,
                redirect: false
              })
            } else {
              return UserActions.autoFail({redirect: true});
            }
          })
        )
      })
    )
  );

  logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.logout),
        switchMap(() => {
          return this.authService.logout().pipe(
            tap(() => {
              return this.router.navigate(['/auth']);
            }),
            catchError(error => {
              return throwError(error);
            })
          )
        })
      ), {
      dispatch: false
    }
  );

}
