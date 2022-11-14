import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ToolbarModule} from 'primeng/toolbar';
import {MenuModule} from 'primeng/menu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenubarModule} from 'primeng/menubar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MyZeiterfassungComponent } from './home/mitarbeiter/my-zeiterfassung/my-zeiterfassung.component';
import { MitarbeiterComponent } from './home/admin/mitarbeiter/mitarbeiter.component';
import { FirmaComponent } from './home/admin/firma/firma.component';
import { ChangeMitarbeiterComponent } from './home/admin/mitarbeiter/change-mitarbeiter.component';
import { NewMitarbeiterComponent } from './home/admin/mitarbeiter/new-mitarbeiter/new-mitarbeiter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MyZeiterfassungComponent,
    MitarbeiterComponent,
    FirmaComponent,
    ChangeMitarbeiterComponent,
    NewMitarbeiterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    PanelModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TabMenuModule,
    TableModule,
    DropdownModule,
    ToolbarModule,
    MenuModule,
    ConfirmDialogModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
