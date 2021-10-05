import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaDolciComponent } from './components/lista-dolci/lista-dolci.component';

import { HttpClientModule } from '@angular/common/http';
import { DolceService } from './services/dolce.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule, Router } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { DettaglioDolciComponent } from './components/dettaglio-dolci/dettaglio-dolci.component';
import { CheckdayPipe } from './pipes/checkday.pipe';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuthGuard, OktaAuthService } from '@okta/okta-angular';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular';

import cakeAppConfig from './config/cake-app-config';
import { DeleteComponent } from './components/back-office/delete/delete.component';
import { CreateComponent } from './components/back-office/create/create.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileService } from './services/file.service';
import { UpdateComponent } from './components/back-office/update/update.component';


const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any, injector: { get: (arg0: typeof Router) => any; }) => {
    const router = injector.get(Router);
    router.navigate(['/login']);
  }
}, cakeAppConfig.oidc);

const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'members', component: ListaDolciComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'members/dolci/pre/delete/:id', component: DettaglioDolciComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'members/dolci/delete/:id', component: DeleteComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'members/dolci/pre/create', component: CreateComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'members/dolci/create', component: CreateComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'members/dolci/pre/update/:id', component: UpdateComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'members/dolci/update/:id', component: UpdateComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'members/dolci/upload', component: CreateComponent, canActivate: [ OktaAuthGuard ]},
  { path: 'dolci/download/:filename', component: ListaDolciComponent},
  { path: 'dolci/search/:keyword', component: ListaDolciComponent },
  { path: 'dolci', component: ListaDolciComponent },
  { path: 'dolci/:id', component: DettaglioDolciComponent },
  { path: '', redirectTo: '/dolci', pathMatch: 'full' },
  { path: '**', redirectTo: '/dolci', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    ListaDolciComponent,
    SearchComponent,
    DettaglioDolciComponent,
    CheckdayPipe,
    LoginComponent,
    LoginStatusComponent,
    DeleteComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    OktaAuthModule,
    ReactiveFormsModule
  ],
  providers: [DolceService, FileService, { provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
