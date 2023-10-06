import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent {
  otherManagerControl;
  otherReasonControl;
  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      company: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      otherManager: '', // Champ de texte conditionnel
      reason: ['', [Validators.required]],
      otherReason: '', // Champ de texte conditionnel
      startedAt: ['', [Validators.required]],
    });
    this.otherManagerControl = this.userForm.get('otherManager') as FormControl; // Utilisation de FormControl
    this.otherReasonControl = this.userForm.get('otherReason') as FormControl; // Utilisation de FormControl
  }

  managers = [
    { name: 'Chloé Maillard', value: '1' },
    { name: 'Eric Gourmel', value: '2' },
    { name: 'Nicolas Pettazzoni', value: '3' },
    { name: 'Ovilac Loison', value: '4' },
    { name: 'Rachel Vincent', value: '5' },
    { name: 'Autre', value: '6' },
  ];

  reasons = [
    { label: 'Entretien', value: '1' },
    { label: 'Visite', value: '2' },
    { label: 'Affaire', value: '3' },
    { label: 'Autre', value: '4' }
    
  ];

  userForm: FormGroup;

  selectedOption: any;
  showOtherManagerField: boolean = false;
  showOtherReasonField: boolean = false;

  onManagerOptionSelect(option: any) {
    this.selectedOption = option.value.name;
    const otherManagerControl = this.userForm.get('otherManager')!;

    if (this.selectedOption === "Autre") {
      otherManagerControl.setValidators([Validators.required]);
      otherManagerControl.updateValueAndValidity();
      this.showOtherManagerField = true;
    } else {
      otherManagerControl.clearValidators();
      otherManagerControl.updateValueAndValidity();
      this.showOtherManagerField = false;
    }
  }

  onReasonOptionSelect(option: any) {
    this.selectedOption = option.value.label;
    const otherReasonControl = this.userForm.get('otherReason')!;
    
    if (this.selectedOption == "Autre") {
      otherReasonControl.setValidators([Validators.required]);
      otherReasonControl.updateValueAndValidity();
      this.showOtherReasonField = true;
    } else {
      otherReasonControl.clearValidators();
      otherReasonControl.updateValueAndValidity();
      this.showOtherReasonField = false;
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.notificationService.showSuccess('Enregistrement réussi', '<strong>Contenu HTML sécurisé</strong>');
    } else {
      console.log(this.userForm.value);

      this.notificationService.showError('Veuillez compléter tous les champs obligatoires (*)', '<strong>Contenu HTML sécurisé</strong>');
    }
  }
}
