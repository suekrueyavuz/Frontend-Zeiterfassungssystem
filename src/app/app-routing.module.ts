import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { FirmaComponent } from "./home/admin/firma/firma.component";
import { MitarbeiterComponent } from "./home/admin/mitarbeiter/mitarbeiter.component";
import { HomeComponent } from "./home/home.component";
import { MyZeiterfassungComponent } from "./home/mitarbeiter/my-zeiterfassung/my-zeiterfassung.component";
import { LoginComponent } from "./login/login.component";
import { RoleGuardService } from "./service/role-guard.service";

const routes: Routes = [
    {
      path: '', 
      component: LoginComponent
    },
    {
      path: 'home', 
      component: HomeComponent,
      canActivate: [RoleGuardService]
    },
    {
      path: 'zeiterfassung', 
      component: MyZeiterfassungComponent,
      canActivate: [RoleGuardService],
      data: {
        expectedRole: 'ROLE_MITARBEITER'
      }
    },
    {
      path: 'admin/mitarbeiter', 
      component: MitarbeiterComponent,
      canActivate: [RoleGuardService], 
      data: { 
        expectedRole: 'ROLE_ADMIN'
      }
    },
    {
      path: 'admin/firma', 
      component: FirmaComponent,
      canActivate: [RoleGuardService], 
      data: { 
        expectedRole: 'ROLE_FIRMA'
      }
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }