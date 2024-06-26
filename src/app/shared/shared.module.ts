import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessagesComponent } from './components/error/validation-messages/validation-messages.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { NotificationComponent } from './components/modal/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { PapelUsuarioDirective } from './directives/papel-usuario.directive';

@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent,
    NotificationComponent,
    PapelUsuarioDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    ValidationMessagesComponent,
    HttpClientModule,
    PapelUsuarioDirective
  ]
})
export class SharedModule { }
