import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListingComponent } from './listing/listing.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppbarComponent } from './appbar/appbar.component';
import { FormComponent } from './form/form.component';
import { ParametersComponent } from './parameters/parameters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    AppbarComponent,
    FormComponent,
    ParametersComponent,
  ],
  imports: [
    InputMaskModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    MenubarModule,
    CalendarModule,
    InputTextModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
