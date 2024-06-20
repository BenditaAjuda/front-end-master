import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/error/not-found/not-found.component';
import { AutorizadoComponent } from './autorizado/autorizado.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'autorizado', component: AutorizadoComponent },
  { path: 'conta', loadChildren: () => import('./conta/conta.module')
    .then(
      module => module.ContaModule
    )},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
