import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager/manager.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent  implements OnInit{
  newManager = ''
  showDialogAdd = false;
  showDialogActive = false;
  showDialogInactive = false;
  selectedManager: any;

  openConfirmationActive(manager: any) {
    this.selectedManager = manager;
    this.showDialogActive = true;
  }
  closeConfirmationActive() {
    this.showDialogActive = false;
  }

  openConfirmationInactive(manager: any) {
    this.selectedManager = manager;
    this.showDialogInactive = true;
  }
  closeConfirmationInactive() {
    this.showDialogInactive = false;
  }

  openDialog() {
    this.showDialogAdd = true;
  }

  closeDialog() {
    this.showDialogAdd = false;
  }
  constructor(private managerService: ManagerService, private notificationService: NotificationService) { }
  managers: any[] = []; 
  activeManagers: any[] = [];
  inactiveManagers: any[] = [];

  ngOnInit() {
    this.managerService.getManagers().subscribe((data) => {
      this.managers = data;
      this.activeManagers = this.managers.filter((manager) => manager.active == true);
      this.inactiveManagers = this.managers.filter((manager) => manager.active == false);
    });
    console.log(this.managers)
  }

  updateManagerState() {
    const managerIdToUpdate = this.selectedManager.id;
    const newManagerState = !this.selectedManager.active; // Inverse l'état actuel

    this.managerService.updateManager(managerIdToUpdate, newManagerState).subscribe(
      (response) => {
        const updatedManager = this.managers.find((m) => m.id === managerIdToUpdate);
        if (updatedManager) {
          updatedManager.isActive = newManagerState;
        }
        this.showDialogActive = false;
        this.showDialogInactive = false;
        this.notificationService.showSuccess('Mise à jour de l\'état réussie', '<strong>Contenu HTML sécurisé</strong>');
        this.managerService.getManagers().subscribe(data => {
          this.managers = data;
          this.activeManagers = this.managers.filter((m) => m.active === true);
          this.inactiveManagers = this.managers.filter((m) => m.active === false);
        });
      },
      (error) => {
        console.error('Échec de la mise à jour de l\'état du manager', error);
        this.notificationService.showError('Échec de la mise à jour de l\'état du manager.', '<strong>Contenu HTML sécurisé</strong>');
      }
    );
  }

  addNewManager() {
    if (this.newManager == '') {
      this.notificationService.showError('Veuillez compléter le champ.', '<strong>Contenu HTML sécurisé</strong>');
      return;
    }
    this.managerService.addManager(this.newManager).subscribe(() => {
      // Gérer le succès de l'ajout du manager
      console.log('Manager ajouté avec succès !');
      this.showDialogAdd = false;
      this.newManager = ''; // Réinitialisez le champ de texte
      this.notificationService.showSuccess('Ajout du manager réussi', '<strong>Contenu HTML sécurisé</strong>');

      // Après avoir ajouté avec succès, mettez à jour la liste des managers
      this.managerService.getManagers().subscribe(data => {
        this.managers = data;
        this.activeManagers = this.managers.filter((manager) => manager.active == true);
        this.inactiveManagers = this.managers.filter((manager) => manager.active == false);
      });
    }, (error) => {
      // Gérer les erreurs en cas d'échec de l'ajout du manager
      console.error('Erreur lors de l\'ajout du manager :', error);
      this.notificationService.showError('Erreur lors de l\'enregistrement.', '<strong>Contenu HTML sécurisé</strong>');
    });
  }


}
