import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent {

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      company: ['', [Validators.required,]],
      manager: ['', [Validators.required,]],
      reason: ['', [Validators.required,]],
      startedAt: ['', [Validators.required,]],
    });
  }
  managers = [
    { name: 'Ovilac Loison', value: 'option1' },
    { name: 'Eric Gourmel', value: 'option2' },
    { name: 'Rachel Vincent', value: 'option3' },
    { name: 'Chloé Maillard', value: 'option4' },
    { name: 'Nicolas Pettazzoni', value: 'option5' }
  ];
  reasons = [
    { label: 'Entretien', value: 'option1' },
    { label: 'Visite', value: 'option2' },
    { label: 'Affaire', value: 'option3' },
    { label: 'Autres', value: 'option4' }
  ];

  userForm: FormGroup;

  selectedOption: any;
  onOptionSelect(option: any) {
    this.selectedOption = option;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.notificationService.showSuccess('Enrgistrement réussi', '<strong>Contenu HTML sécurisé</strong>');
    } else {
      console.log(this.userForm.value);
      this.notificationService.showError('Paramètres manquants', '<strong>Contenu HTML sécurisé</strong>');
    }

  }
}
