import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/cinema/movies', pathMatch: 'full' },
  { path: 'cinema', loadChildren: () => import('./features/cinema/cinema.module').then(m => m.CinemaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
