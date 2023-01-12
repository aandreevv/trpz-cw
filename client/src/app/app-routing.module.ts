import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'audiotracks', pathMatch: "full"},
  {path: 'auth', loadChildren: () => import("../app/core/core.module").then(m => m.CoreModule)},
  {path: 'audiotracks', loadChildren: () => import("../app/features/audiotracks/audiotracks.module").then(m => m.AudiotracksModule)},
  {path: 'playlists', loadChildren: () => import("../app/features/playlists/playlists.module").then(m => m.PlaylistsModule)},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
