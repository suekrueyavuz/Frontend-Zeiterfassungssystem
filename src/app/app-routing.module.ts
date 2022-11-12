import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { FirmaComponent } from "./home/admin/firma/firma.component";
import { MitarbeiterComponent } from "./home/admin/mitarbeiter/mitarbeiter.component";
import { HomeComponent } from "./home/home.component";
import { MyZeiterfassungComponent } from "./home/mitarbeiter/my-zeiterfassung/my-zeiterfassung.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
    {
      path: '', 
      component: LoginComponent
    },
    {
      path: 'home', 
      component: HomeComponent
    },
    {
      path: 'zeiterfassung', 
      component: MyZeiterfassungComponent
    },
    {
      path: 'admin/mitarbeiter', 
      component: MitarbeiterComponent
    },
    {
      path: 'admin/firma', 
      component: FirmaComponent
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }