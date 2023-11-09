import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../services/manager/manager.service';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent  implements OnInit{
  newManager = ''; 
  showDialog = false;
  showDialogConfirmation = false;
  selectedManager: any;

  openConfirmation(manager: any) {
    this.selectedManager = manager;
    this.showDialogConfirmation = true;
  }
  closeConfirmation() {
    this.showDialogConfirmation = false;
  }

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
  constructor(private managerService: ManagerService, private notificationService: NotificationService) { }
  managers: any[] = []; 

  ngOnInit() {
    this.managerService.getManagers().subscribe(data => {
      this.managers = data;
    });
  }

  delManager() {
    const managerIdToDelete = this.selectedManager.id;
    this.managerService.delManager(managerIdToDelete).subscribe(
      (response) => {
        const index = this.managers.findIndex(manager => manager.id === managerIdToDelete);
        if (index !== -1) {
          this.managers.splice(index, 1);
        }
        this.showDialogConfirmation = false;
        this.notificationService.showSuccess('Supression réussi', '<strong>Contenu HTML sécurisé</strong>');
      },
      (error) => {
        console.error('Échec de la suppression du manager', error);
        this.notificationService.showError('Échec de la suppression du manager.', '<strong>Contenu HTML sécurisé</strong>');
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
      this.showDialog = false;
      this.newManager = ''; // Réinitialisez le champ de texte
      this.notificationService.showSuccess('Ajout du manager réussi', '<strong>Contenu HTML sécurisé</strong>');

      // Après avoir ajouté avec succès, mettez à jour la liste des managers
      this.managerService.getManagers().subscribe(data => {
        this.managers = data;
      });
    }, (error) => {
      // Gérer les erreurs en cas d'échec de l'ajout du manager
      console.error('Erreur lors de l\'ajout du manager :', error);
      this.notificationService.showError('Erreur lors de l\'enregistrement.', '<strong>Contenu HTML sécurisé</strong>');
    });
  }


}
