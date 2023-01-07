import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuthComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule
  ],
  exports: [
    AuthComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
