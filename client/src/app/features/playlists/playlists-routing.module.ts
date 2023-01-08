import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../core/auth/auth.guard";
import {PlaylistsComponent} from "./playlists.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: PlaylistsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
