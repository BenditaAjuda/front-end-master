import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorizadoComponent } from './autorizado/autorizado.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { PrestadorComponent } from './prestador/prestador/prestador.component';
import { CompletarPrestadorComponent } from './prestador/completar-prestador/completar-prestador.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FilterPipe } from './pipes/filter.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule } from 'ngx-mask'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CapitalizeFirstPipe } from './pipes/primeira-maiuscula.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AutorizadoComponent,
    HomeComponent,
    NavbarComponent,
    PrestadorComponent,
    CompletarPrestadorComponent,
    FilterPipe,
    CapitalizeFirstPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    NgSelectModule,
    TooltipModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
