import {User} from "../user.model";
import {Action, createReducer, on} from "@ngrx/store";
import * as UserActions from "./user.actions";

export interface State {
  user: User | null,
  authenticationError: string | null,
  isLoading: boolean
}

const initialState: State = {
  user: null,
  authenticationError: null,
  isLoading: false
}

const _userReducer = createReducer(
  initialState,
  on(UserActions.startLogin, UserActions.startSignUp, UserActions.initAuth, (state) => {
    return {
      ...state,
      authenticationError: null,
      isLoading: true
    }
  }),
  on(UserActions.authSuccess, (state, action) => {
    return {
      ...state,
      authenticationError: null,
      user: new User(action.id, action.username, action.email),
      isLoading: false
    }
  }),
  on(UserActions.authFail, (state, action) => {
    return {
      ...state,
      user: null,
      authenticationError: action.errorMessage,
      isLoading: false
    }
  }),
  on(UserActions.logout, (state) => {
    return {
      ...state,
      user: null,
      authenticationError: null
    }
  }),
  on(UserActions.editUserSuccess, (state, action) => {
    return {
      ...state,
      user: new User(action.user.id, action.user.username, action.user.email)
    }
  })
)

export function userReducer(state: State | undefined, action: Action) {
  return _userReducer(state, action);
}
