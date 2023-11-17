// auth.service.ts

import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';
import { NotificationService } from '../notification/notification.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';
    constructor(private http: HttpClient, private stateService: StateService, private notificationService: NotificationService) { }

    seConnecter(nomUtilisateur: string, motDePasse: string): Observable<boolean> {
        const credentials = { username: nomUtilisateur, password: motDePasse };

        return this.http.post<any>(`${this.apiUrl}/login`, credentials, { responseType: 'text' as 'json' })
            .pipe(
                map(response => {
                    // Gérer la réponse en tant que texte brut
                    console.log('Réponse réussie :', response);
                    this.stateService.setUtilisateurConnecte(true);
                    // Vous pouvez effectuer un traitement supplémentaire ici si nécessaire
                    return true; // Ou retournez la valeur souhaitée pour le succès
                }),
                catchError(error => {
                    // Gérer l'erreur en tant que texte brut
                    console.error('Erreur lors de la connexion :', error);

                    this.stateService.setUtilisateurConnecte(false);
                    // Vous pouvez effectuer un traitement supplémentaire ici si nécessaire
                    return of(false); // Ou retournez la valeur souhaitée pour l'échec
                })
            );
    }

    estConnecte(): boolean {
        return this.stateService.utilisateurConnecteSubject.value;
    }

    seDeconnecter(): void {
        this.stateService.setUtilisateurConnecte(false);
    }
}
