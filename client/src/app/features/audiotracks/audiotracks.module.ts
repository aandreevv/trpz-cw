import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AudiotracksRoutingModule} from './audiotracks-routing.module';
import {AudiotracksComponent} from './audiotracks.component';
import {CreateAudiotrackComponent} from './create-audiotrack/create-audiotrack.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AudiotrackComponent } from './audiotrack/audiotrack.component';
import {CoreModule} from "../../core/core.module";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        AudiotracksComponent,
        CreateAudiotrackComponent,
        AudiotrackComponent
    ],
    exports: [
        AudiotrackComponent
    ],
  imports: [
    CommonModule,
    AudiotracksRoutingModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CoreModule,
    MatIconModule,
    SharedModule
  ]
})
export class AudiotracksModule {
}
