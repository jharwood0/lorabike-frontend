import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from "angular2-perfect-scrollbar";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//temp
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './dashboard/map/map.component';
import { OverviewComponent } from './dashboard/overview/overview.component';

import { QuickpanelComponent } from './components/quickpanel/quickpanel.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { BreadcrumbsComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from "./components/breadcrumb/breadcrumb.service";
import { SidenavService } from "./components/sidenav/sidenav.service";
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { DeviceService } from './device.service';
import { LogoutComponent } from './logout/logout.component';


const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const appRoutes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'map',
        canActivate: [AuthGuard],
        component: MapComponent
      },
      {
        path: '',
        canActivate: [AuthGuard],
        component: OverviewComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    OverviewComponent,
    DashboardComponent,
    QuickpanelComponent,
    SidenavComponent,
    SidenavItemComponent,
    BreadcrumbsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule.forRoot(perfectScrollbarConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjvGgmTVf5gE0aLcivSDUSGmtDPmybj90'
    })
  ],
  providers: [
    BreadcrumbService,
    SidenavService,
    AuthService,
    AuthGuard,
    DeviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
