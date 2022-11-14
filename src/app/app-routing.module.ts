import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { FirmaComponent } from "./home/admin/firma/firma.component";
import { MitarbeiterComponent } from "./home/admin/mitarbeiter/mitarbeiter.component";
import { HomeComponent } from "./home/home.component";
import { MyZeiterfassungComponent } from "./home/mitarbeiter/my-zeiterfassung/my-zeiterfassung.component";
import { LoginComponent } from "./login/login.component";
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
        role: 'ROLE_MITARBEITER'
      }
    },
    {
      path: 'admin/mitarbeiter', 
      component: MitarbeiterComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'ROLE_ADMIN'
      }
    },
    {
      path: 'admin/firma', 
      component: FirmaComponent,
      canActivate: [AuthGuard],
      data: {
        role: 'ROLE_ADMIN'
      }
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }