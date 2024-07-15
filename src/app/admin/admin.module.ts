import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from '../shared/shared.module';
import { AddEditUsuarioComponent } from './add-edit-usuario/add-edit-usuario.component';


@NgModule({
  declarations: [
    AdminComponent,
    AddEditUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TooltipModule.forRoot(),
    SharedModule
  ]
})
export class AdminModule { }
