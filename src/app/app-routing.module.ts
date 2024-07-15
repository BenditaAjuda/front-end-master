import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/error/not-found/not-found.component';
import { AutorizadoComponent } from './autorizado/autorizado.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    children: [
      { path: 'autorizado', component: AutorizadoComponent },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)}
    ]
  },
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
