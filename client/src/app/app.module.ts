import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import * as AppReducer from "./store/app.reducer";
import {environment} from "../environments/environment";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {UserEffects} from "./core/auth/store/user.effects";
import {AudiotracksEffects} from "./features/audiotracks/store/audiotracks.effects";
import {SharedModule} from "./shared/shared.module";
import {PlayerEffects} from "./shared/player/store/player.effects";
import {PlaylistsEffects} from "./features/playlists/store/playlists.effects";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule,
        StoreModule.forRoot(AppReducer.appReducer),
        EffectsModule.forRoot([UserEffects, AudiotracksEffects, PlayerEffects, PlaylistsEffects]),
        StoreDevtoolsModule.instrument({logOnly: environment.production}),
        SharedModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
