import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { PlayerComponent } from './player/player.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { TrackProgressComponent } from './player/track-progress/track-progress.component';



@NgModule({
    declarations: [
        ClickOutsideDirective,
        PlayerComponent,
        TrackProgressComponent
    ],
    exports: [
        ClickOutsideDirective,
        PlayerComponent
    ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
