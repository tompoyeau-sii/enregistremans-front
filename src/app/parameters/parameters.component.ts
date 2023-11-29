// Importation des modules nécessaires depuis Angular
import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager/manager.service';
import { NotificationService } from '../services/notification/notification.service';

// Définition du composant Angular
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html'
})
export class ParametersComponent implements OnInit {
  // Initialisation des variables
  newManager = '';
  showDialogAdd = false;
  showDialogActive = false;
  showDialogInactive = false;
  selectedManager: any;
  loading: boolean = true;

  // Déclaration des listes de gestionnaires actifs, inactifs et tous les gestionnaires
  managers: any[] = [];
  activeManagers: any[] = [];
  inactiveManagers: any[] = [];

  // Constructeur du composant
  constructor(private managerService: ManagerService, private notificationService: NotificationService) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Récupération de la liste complète des gestionnaires depuis le service
    this.managerService.getManagers().subscribe((data) => {
      this.managers = data;
      // Filtrage des gestionnaires actifs et inactifs
      this.activeManagers = this.managers.filter((manager) => manager.active == true);
      this.inactiveManagers = this.managers.filter((manager) => manager.active == false);
      this.loading = false;
    });
  }

  // Méthode pour ouvrir la confirmation d'activation d'un gestionnaire
  openConfirmationActive(manager: any) {
    this.selectedManager = manager;
    this.showDialogActive = true;
  }

  // Méthode pour fermer la confirmation d'activation d'un gestionnaire
  closeConfirmationActive() {
    this.showDialogActive = false;
  }

  // Méthode pour ouvrir la confirmation de désactivation d'un gestionnaire
  openConfirmationInactive(manager: any) {
    this.selectedManager = manager;
    this.showDialogInactive = true;
  }

  // Méthode pour fermer la confirmation de désactivation d'un gestionnaire
  closeConfirmationInactive() {
    this.showDialogInactive = false;
  }

  // Méthode pour ouvrir la boîte de dialogue d'ajout d'un nouveau gestionnaire
  openDialog() {
    this.showDialogAdd = true;
  }

  // Méthode pour fermer la boîte de dialogue d'ajout d'un nouveau gestionnaire
  closeDialog() {
    this.showDialogAdd = false;
  }

  // Méthode pour mettre à jour l'état d'un gestionnaire (actif ou inactif)
  updateManagerState() {
    const managerIdToUpdate = this.selectedManager.id;
    const newManagerState = !this.selectedManager.active; // Inversion de l'état actuel

    this.managerService.updateManager(managerIdToUpdate, newManagerState).subscribe(
      (response) => {
        // Mise à jour de l'état du gestionnaire dans la liste
        const updatedManager = this.managers.find((m) => m.id === managerIdToUpdate);
        if (updatedManager) {
          updatedManager.isActive = newManagerState;
        }
        // Fermeture des boîtes de dialogue de confirmation
        this.showDialogActive = false;
        this.showDialogInactive = false;
        // Affichage d'une notification de succès
        this.notificationService.showSuccess('Mise à jour de l\'état réussie', '<strong>Contenu HTML sécurisé</strong>');
        // Rafraîchissement de la liste des gestionnaires après la mise à jour
        this.managerService.getManagers().subscribe(data => {
          this.managers = data;
          this.activeManagers = this.managers.filter((m) => m.active === true);
          this.inactiveManagers = this.managers.filter((m) => m.active === false);
        });
      },
      (error) => {
        // Gestion des erreurs en cas d'échec de la mise à jour de l'état du gestionnaire
        console.error('Échec de la mise à jour de l\'état du gestionnaire', error);
        this.notificationService.showError('Échec de la mise à jour de l\'état du gestionnaire.', '<strong>Contenu HTML sécurisé</strong>');
      }
    );
  }

  // Méthode pour ajouter un nouveau gestionnaire
  addNewManager() {
    // Vérification du champ de texte non vide
    if (this.newManager == '') {
      this.notificationService.showError('Veuillez compléter le champ.', '<strong>Contenu HTML sécurisé</strong>');
      return;
    }

    // Appel du service pour ajouter le nouveau gestionnaire
    this.managerService.addManager(this.newManager).subscribe(() => {
      // Gestion du succès de l'ajout du gestionnaire
      console.log('Manager ajouté avec succès !');
      // Fermeture de la boîte de dialogue d'ajout
      this.showDialogAdd = false;
      // Réinitialisation du champ de texte
      this.newManager = '';
      // Affichage d'une notification de succès
      this.notificationService.showSuccess('Ajout du gestionnaire réussi', '<strong>Contenu HTML sécurisé</strong>');
      // Rafraîchissement de la liste des gestionnaires après l'ajout
      this.managerService.getManagers().subscribe(data => {
        this.managers = data;
        this.activeManagers = this.managers.filter((manager) => manager.active == true);
        this.inactiveManagers = this.managers.filter((manager) => manager.active == false);
      });
    }, (error) => {
      // Gestion des erreurs en cas d'échec de l'ajout du gestionnaire
      console.error('Erreur lors de l\'ajout du gestionnaire :', error);
      this.notificationService.showError('Erreur lors de l\'enregistrement.', '<strong>Contenu HTML sécurisé</strong>');
    });
  }
}
