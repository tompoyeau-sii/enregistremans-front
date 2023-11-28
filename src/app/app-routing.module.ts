import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { FormComponent } from './form/form.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthGuard } from './services/AuthGuard/auth.guard';


const routes: Routes = [
  { path: '', component: ConnexionComponent },
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'listing', component: ListingComponent, canActivate: [AuthGuard] },
  { path: 'parameters', component: ParametersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
