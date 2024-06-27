import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AddEditUsuarioComponent } from './add-edit-usuario/add-edit-usuario.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminComponent },
      { path: 'add-edit-usuario', component: AddEditUsuarioComponent },
      { path: 'add-edit-usuario/:id', component: AddEditUsuarioComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
