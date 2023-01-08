import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {map, Subscription} from "rxjs";
import * as App from "../../store/app.reducer";
import { User } from '../auth/user.model';
import * as UserActions from "../auth/store/user.actions";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User | null = null;
  private userSubscription: Subscription;
  public isDropdownOpen: boolean = false;

  constructor(private store: Store<App.AppState>, private service: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => {
      this.user = user;
    })
  }

  onLogout() {
    this.store.dispatch(UserActions.logout());
  }

}
