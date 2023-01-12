import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AudiotracksComponent} from "./audiotracks.component";
import {AuthGuard} from "../../core/auth/auth.guard";
import {AudiotracksResolver} from "./audiotracks.resolver";
import {CreateAudiotrackComponent} from "./create-audiotrack/create-audiotrack.component";
import {PlaylistsResolver} from "../playlists/playlists.resolver";

const routes: Routes = [
  {path: '', component: AudiotracksComponent, canActivate: [AuthGuard], resolve: [AudiotracksResolver, PlaylistsResolver]},
  {path: 'create', component: CreateAudiotrackComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudiotracksRoutingModule { }
