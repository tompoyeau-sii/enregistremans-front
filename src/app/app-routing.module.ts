import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { FormComponent } from './form/form.component';
import { ParametersComponent } from './parameters/parameters.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'parameters', component: ParametersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
