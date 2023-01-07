import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import("../app/features/main/main.module").then(m => m.MainModule)},
  {path: 'auth', loadChildren: () => import("../app/core/core.module").then(m => m.CoreModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
