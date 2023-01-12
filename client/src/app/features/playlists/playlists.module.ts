import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';
import {CoreModule} from "../../core/core.module";
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { PlaylistListItemComponent } from './playlist-list-item/playlist-list-item.component';
import {MatIconModule} from "@angular/material/icon";
import {AudiotracksModule} from "../audiotracks/audiotracks.module";
import { PlaylistAudioComponent } from './playlist-audio/playlist-audio.component';


@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    PlaylistListItemComponent,
    PlaylistAudioComponent
  ],
    imports: [
        CommonModule,
        PlaylistsRoutingModule,
        CoreModule,
        MatStepperModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        AudiotracksModule
    ]
})
export class PlaylistsModule { }
