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
import {MenubarModule} from 'primeng/menubar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CalendarModule} from 'primeng/calendar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MyZeiterfassungComponent } from './home/mitarbeiter/my-zeiterfassung/my-zeiterfassung.component';
import { NewMitarbeiterComponent } from './home/admin/mitarbeiter/new-mitarbeiter/new-mitarbeiter.component';
import { MitarbeiterAusleihenComponent } from './home/admin/mitarbeiter/mitarbeiter-ausleihen/mitarbeiter-ausleihen.component';
import { VerfuegbareMitarbeiterComponent } from './home/admin/mitarbeiter/mitarbeiter-ausleihen/verfuegbare-mitarbeiter/verfuegbare-mitarbeiter.component';
import { VerfuegbareFirmenComponent } from './home/admin/mitarbeiter/mitarbeiter-ausleihen/verfuegbare-firmen/verfuegbare-firmen.component';
import { AlleMitarbeiterComponent } from './home/admin/mitarbeiter/alle-mitarbeiter/alle-mitarbeiter.component';
import { ChangeMitarbeiterComponent } from './home/admin/mitarbeiter/alle-mitarbeiter/change-mitarbeiter.component';
import { PasswortAendernComponent } from './modules/passwort-aendern/passwort-aendern.component';
import { AlleFirmenComponent } from './home/admin/firma/alle-firmen/alle-firmen.component';
import { NewFirmaComponent } from './home/admin/firma/new-firma/new-firma.component';
import { AusgelieheneMitarbeiterComponent } from './home/firma/ausgeliehene-mitarbeiter/ausgeliehene-mitarbeiter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MyZeiterfassungComponent,
    ChangeMitarbeiterComponent,
    NewMitarbeiterComponent,
    MitarbeiterAusleihenComponent,
    VerfuegbareMitarbeiterComponent,
    VerfuegbareFirmenComponent,
    AlleMitarbeiterComponent,
    PasswortAendernComponent,
    AlleFirmenComponent,
    NewFirmaComponent,
    AusgelieheneMitarbeiterComponent
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
    MenubarModule,
    DynamicDialogModule,
    CalendarModule
  ],
  providers: [DynamicDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
