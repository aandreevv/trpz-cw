import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../core/auth/auth.guard";
import {PlaylistsComponent} from "./playlists.component";
import {PlaylistsResolver} from "./playlists.resolver";
import {CreatePlaylistComponent} from "./create-playlist/create-playlist.component";
import {PlaylistComponent} from "./playlist/playlist.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], resolve: [PlaylistsResolver], component: PlaylistsComponent},
  {path: 'create', canActivate: [AuthGuard], component: CreatePlaylistComponent},
  {path: ':id', canActivate: [AuthGuard], resolve: [PlaylistsResolver], component: PlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
