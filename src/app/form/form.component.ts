import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../services/notification/notification.service';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from '../services/manager/manager.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit{
  otherManagerControl;
  otherReasonControl;
  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService, private http: HttpClient, private managerService: ManagerService) {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      phone: '', // Champ optionnel
      company: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      otherManager: '', // Champ optionnel
      reason: ['', [Validators.required]],
      otherReason: '', // Champ optionnel
      estimateTime: ['', [Validators.required]],
      startedAt: ['', [Validators.required]],
    });
    this.otherManagerControl = this.userForm.get('otherManager') as FormControl; // Utilisation de FormControl
    this.otherReasonControl = this.userForm.get('otherReason') as FormControl; // Utilisation de FormControl
  }

  managers: any[] = []; 

  reasons = [
    { label: 'Entretien' },
    { label: 'Visite' },
    { label: 'Affaire' },
    { label: 'Autre' }

  ];
  estimateTimes = [
    { label: '30 minutes' },
    { label: '1 heure' },
    { label: '1/2 journée' },
    { label: '1 journée' }

  ];

  userForm: FormGroup;

  selectedOption: any;
  showOtherManagerField: boolean = false;
  showOtherReasonField: boolean = false;

  ngOnInit() {
    this.managerService.getActiveManagers().subscribe(data => {
      console.log(data)
      this.managers = data;
      this.managers.push({fullname : 'Autre'})
    });
    console.log(this.managers)
  }

  onManagerOptionSelect(option: any) {
    this.selectedOption = option.value.fullname;
    const otherManagerControl = this.userForm.get('otherManager')!;

    if (this.selectedOption === "Autre") {
      otherManagerControl.setValidators([Validators.required]);
      otherManagerControl.updateValueAndValidity();
      this.showOtherManagerField = true;
    } else {
      otherManagerControl.clearValidators();
      otherManagerControl.updateValueAndValidity();
      this.userForm.get('otherManager')?.setValue(null);
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
      this.userForm.get('otherReason')?.setValue(null);
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
      const formData = this.userForm.value;

      if (formData.otherReason) {
        formData.reason = formData.otherReason;
      }
      if (formData.otherManager) {
        formData.manager = null;
      }

      // Formatage de la date
      if (typeof formData.startedAt != 'string') {
        formData.startedAt = format(formData.startedAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
      }
      if (typeof formData.reason != 'string') {
        formData.reason = formData.reason.label;
      }
      formData.estimateTime = formData.estimateTime.label;

      // Effectuer la requête POST à l'API
      this.http.post('http://localhost:8080/Registers', formData).subscribe(
        (response) => {
          console.log('Réponse de l\'API :', response);
          this.notificationService.showSuccess('Enregistrement réussi', '<strong>Contenu HTML sécurisé</strong>');

          // Réinitialiser les valeurs du formulaire
          this.userForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement :', error);
          this.notificationService.showError('Une erreur est survenue lors de l\'enregistrement.', '<strong>Contenu HTML sécurisé</strong>');
        }
      );
    } else {
      this.notificationService.showError('Veuillez compléter tous les champs obligatoires (*)', '<strong>Contenu HTML sécurisé</strong>');
    }
  }

}