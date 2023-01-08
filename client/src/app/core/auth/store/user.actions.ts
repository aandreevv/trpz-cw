import {createAction, props} from "@ngrx/store";
import { User } from "../user.model";

export const startLogin = createAction(
  "[Auth] Start Login",
  props<{email: string, password: string}>()
);

export const startSignUp = createAction(
  "[Auth] Start Sign Up",
  props<{username: string, email: string, password: string}>()
);

export const authSuccess = createAction(
  "[Auth] Success",
  props<{id: string, username: string, email: string, redirect: boolean}>()
);

export const authFail = createAction(
  "[Auth] Fail",
  props<{errorMessage: string, redirect: boolean}>()
);

export const logout = createAction(
  "[Auth] Logout"
);

export const logoutSuccess = createAction(
  "[Auth] Logout Success"
);

export const initAuth = createAction(
  "[Auth] Init"
);

export const autoFail = createAction(
  "[Auth] Fail Auto",
  props<{redirect: boolean}>()
)

export const editUserSuccess = createAction(
  "[User] Edit User Success",
  props<{user: User}>()
)
