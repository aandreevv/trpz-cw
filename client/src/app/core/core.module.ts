import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { HeadingComponent } from './heading/heading.component';


@NgModule({
  declarations: [
    AuthComponent,
    HeaderComponent,
    HeadingComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    SharedModule
  ],
    exports: [
        AuthComponent,
        HeaderComponent,
        HeadingComponent
    ]
})
export class CoreModule { }
