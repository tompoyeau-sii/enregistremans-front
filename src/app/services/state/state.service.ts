// state.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    utilisateurConnecteSubject = new BehaviorSubject<boolean>(false);
    utilisateurConnecte$ = this.utilisateurConnecteSubject.asObservable();

    constructor() {
        // Récupérez l'état initial depuis localStorage
        const etatInitial = localStorage.getItem('utilisateurConnecte') === 'true';
        this.setUtilisateurConnecte(etatInitial);
    }

    setUtilisateurConnecte(etat: boolean): void {
        // Mettez à jour l'état et stockez-le dans localStorage
        this.utilisateurConnecteSubject.next(etat);
        localStorage.setItem('utilisateurConnecte', etat.toString());
    }
}
