import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {AppState} from "./store/app.reducer";
import * as UserActions from "../app/core/auth/store/user.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'music';


  constructor(private store : Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.initAuth())
  }

}
