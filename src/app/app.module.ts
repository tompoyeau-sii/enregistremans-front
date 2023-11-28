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
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConnexionComponent } from './connexion/connexion.component';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FullscreenButtonComponent } from './fullscreen-button/fullscreen-button.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    AppbarComponent,
    FormComponent,
    ParametersComponent,
    ConnexionComponent,
    FullscreenButtonComponent,
  ],
  imports: [
    CardModule,
    SkeletonModule,
    HttpClientModule,
    PasswordModule,
    ConfirmPopupModule,
    DialogModule,
    ListboxModule,
    InputMaskModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    MessagesModule,
    AppRoutingModule,
    MenubarModule,
    CalendarModule,
    InputTextModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
