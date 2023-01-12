import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { PlayerComponent } from './player/player.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { TrackProgressComponent } from './player/track-progress/track-progress.component';
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
    declarations: [
        ClickOutsideDirective,
        PlayerComponent,
        TrackProgressComponent,
        DropdownComponent
    ],
    exports: [
        ClickOutsideDirective,
        PlayerComponent,
        DropdownComponent
    ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule { }
