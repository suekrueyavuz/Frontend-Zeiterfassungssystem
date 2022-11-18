import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { FirmaComponent } from "./home/admin/firma/firma.component";
import { AlleMitarbeiterComponent } from "./home/admin/mitarbeiter/alle-mitarbeiter/alle-mitarbeiter.component";
import { MitarbeiterAusleihenComponent } from "./home/admin/mitarbeiter/mitarbeiter-ausleihen/mitarbeiter-ausleihen.component";
import { NewMitarbeiterComponent } from "./home/admin/mitarbeiter/new-mitarbeiter/new-mitarbeiter.component";
import { HomeComponent } from "./home/home.component";
import { MyZeiterfassungComponent } from "./home/mitarbeiter/my-zeiterfassung/my-zeiterfassung.component";
import { LoginComponent } from "./login/login.component";
import { PasswortAendernComponent } from "./modules/passwort-aendern/passwort-aendern.component";
import { AuthGuard } from "./service/auth.guard";

const routes: Routes = [
    {
      path: '', 
      component: LoginComponent
    },
    {
      path: 'home', 
      component: HomeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'zeiterfassung', 
      component: MyZeiterfassungComponent,
      canActivate: [AuthGuard],
      data: {
        role: ['ROLE_MITARBEITER']
      }
    },
    {
      path: 'admin/mitarbeiter', 
      component: AlleMitarbeiterComponent,
      canActivate: [AuthGuard],
      data: {
        role: ['ROLE_ADMIN']
      }
    },
    {
      path: 'admin/firma', 
      component: FirmaComponent,
      canActivate: [AuthGuard],
      data: {
        role: ['ROLE_ADMIN']
      }
    },
    {
      path: 'admin/mitarbeiter/neu',
      component: NewMitarbeiterComponent,
      canActivate: [AuthGuard],
      data: {
        role: ['ROLE_ADMIN']
      }
    },
    {
      path: 'admin/mitarbeiter/ausleihen',
      component: MitarbeiterAusleihenComponent,
      canActivate: [AuthGuard],
      data: {
        role: ['ROLE_ADMIN']
      }
    },
    {
      path: 'einstellungen/passwort',
      component: PasswortAendernComponent,
      canActivate: [AuthGuard],
      data: {
        role: ['ROLE_FIRMA', 'ROLE_SCHICHTLEITER']
      }
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }