import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as App from "../../store/app.reducer";
import * as UserActions from "./store/user.actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  error: string | null = null;

  constructor(private store: Store<App.AppState>) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  onAuthSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value["email"];
    const password = form.value["password"];
    const username = form.value["username"];
    const confirm = form.value["password-confirm"];


    if(this.isLogin) {
      this.store.dispatch(UserActions.startLogin({email, password}));
    } else {
      if (password !== confirm) {
        return this.store.dispatch(UserActions.authFail({errorMessage: "Passwords do not match!", redirect: false}));
      }
      this.store.dispatch(UserActions.startSignUp({username, email, password}));
    }
  }
}
