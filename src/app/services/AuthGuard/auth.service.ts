// auth.service.ts

import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private stateService: StateService, private notificationService: NotificationService) { }

    seConnecter(nomUtilisateur: string, motDePasse: string): boolean {
        let authReussie = false;
        if(nomUtilisateur == 'root' && motDePasse == 'root') {
            authReussie = true;
        }

        if (authReussie) {
            this.stateService.setUtilisateurConnecte(true);
            return true;
        } else {
            this.stateService.setUtilisateurConnecte(false);
            this.notificationService.showError('Identifiant/Mot de passe incorrect.', '<strong>Contenu HTML sécurisé</strong>');
            return false;
        }
    }

    estConnecte(): boolean {
        return this.stateService.utilisateurConnecteSubject.value;
    }

    seDeconnecter(): void {
        this.stateService.setUtilisateurConnecte(false);
    }
}
