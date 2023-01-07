import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  onAuthSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {

  }
}
