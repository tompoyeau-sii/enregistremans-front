// Importation des modules nécessaires depuis Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../services/notification/notification.service';
import { HttpClient } from '@angular/common/http';
import { ManagerService } from '../services/manager/manager.service';
import { format } from 'date-fns';
import { ConfigService } from '../services/config/config.service';

// Définition du composant Angular
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  otherManagerControl;
  otherReasonControl;

  // Initialisation du formulaire avec FormBuilder
  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private http: HttpClient,
    private managerService: ManagerService,
    private config: ConfigService
  ) {
    // Définition des champs du formulaire avec les validateurs nécessaires
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')]],
      phone: [''],// Champ optionnel
      company: ['', [Validators.required]],
      badge: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      otherManager: '', // Champ optionnel
      reason: ['', [Validators.required]],
      otherReason: '', // Champ optionnel
      estimateTime: ['', [Validators.required]],
      startedAt: ['', [Validators.required]],
      here:false,
    });

    // Initialisation des contrôles pour les champs optionnels
    this.otherManagerControl = this.userForm.get('otherManager') as FormControl;
    this.otherReasonControl = this.userForm.get('otherReason') as FormControl;
  }

  // Initialisation des listes de choix
  managers: any[] = [];
  reasons = [
    { label: 'Entretien' },
    { label: 'Visite' },
    { label: 'Affaire' },
    { label: 'Autre' },
  ];
  estimateTimes = [
    { label: '30 minutes' },
    { label: '1 heure' },
    { label: '1/2 journée' },
    { label: '1 journée' },
  ];
  badges = [
    { label: 'Vistieur 1' },
    { label: 'Vistieur 2' },
    { label: 'Vistieur 3' },
    { label: 'Vistieur 4' },
    { label: 'Vistieur 5' },
    { label: 'Vistieur 6' },
    { label: 'Vistieur 7' },
    { label: 'Vistieur 8' },
    { label: 'Vistieur 9' },
    { label: 'Vistieur 10' },
    { label: 'Vistieur 11' },
    { label: 'Vistieur 12' },
    { label: 'Vistieur 13' },
    { label: 'Vistieur 14' },
    { label: 'Vistieur 15' },
    { label: 'Vistieur 16' },
    { label: 'Vistieur 17' },
    { label: 'Vistieur 18' },
    { label: 'Vistieur 19' },
    { label: 'Vistieur 20' }
  ];

  // Déclaration du formulaire
  userForm: FormGroup;

  // Variables de gestion de l'interface utilisateur
  selectedOption: any;
  showOtherManagerField: boolean = false;
  showOtherReasonField: boolean = false;
  loading: boolean = false;
  filteredBadges: any[] = [];

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Récupération des gestionnaires actifs depuis le service
    this.managerService.getActiveManagers().subscribe(data => {
      console.log(data);
      this.managers = data;
      // Ajout de l'option "Autre" aux gestionnaires
      this.managers.push({ fullname: 'Autre' });
    });
    console.log(this.managers);
  }

  // Méthode appelée lors de la sélection d'une option de gestionnaire
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

  // Méthode appelée lors de la sélection d'une option de raison
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

  // Vérifie si un champ du formulaire est invalide
  isFieldInvalid(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }


  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    // Marque tous les champs du formulaire comme "touchés"
    this.userForm.markAllAsTouched();

    // Vérifie la validité du formulaire
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      // Remplace la raison par "Autre" si le champ "otherReason" est renseigné
      if (formData.otherReason) {
        formData.reason = formData.otherReason;
      }

      // Réinitialise le gestionnaire si le champ "otherManager" est renseigné
      if (formData.otherManager) {
        formData.manager = null;
      }

      // Formatage de la date
      if (typeof formData.startedAt != 'string') {
        formData.startedAt = format(formData.startedAt, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
      }

      // Convertit la raison en libellé si elle est de type objet
      if (typeof formData.reason != 'string') {
        formData.reason = formData.reason.label;
      }

      // Convertit la raison en libellé si elle est de type objet
      if (typeof formData.badge != 'string') {
        formData.badge = formData.badge.label;
      }

      if (!formData.mail && !formData.phone) {
        this.notificationService.showError('Veuillez fournir soit un email soit un numéro de téléphone', '<strong>Contenu HTML sécurisé</strong>');
        return;
      }

      // Convertit la durée estimée en libellé
      formData.estimateTime = formData.estimateTime.label;

      // Active l'indicateur de chargement
      this.loading = true;

      // Effectue la requête POST à l'API
      this.http.post(`${this.config.apiUrl}Registers`, formData).subscribe(
        (response) => {
          // Désactive l'indicateur de chargement
          this.loading = false;
          // Affiche une notification de succès
          this.notificationService.showSuccess('Enregistrement réussi', '<strong>Contenu HTML sécurisé</strong>');
          // Réinitialise les valeurs du formulaire
          this.userForm.reset();
        },
        (error) => {
          // Désactive l'indicateur de chargement
          this.loading = false;
          // Affiche une notification d'erreur
          console.error('Erreur lors de l\'enregistrement :', error);
          this.notificationService.showError('Une erreur est survenue lors de l\'enregistrement.', '<strong>Contenu HTML sécurisé</strong>');
        }
      );
    } else {
      // Affiche une notification d'erreur si le formulaire n'est pas valide
      this.notificationService.showError('Veuillez compléter tous les champs obligatoires (*)', '<strong>Contenu HTML sécurisé</strong>');
    }
  }
}
