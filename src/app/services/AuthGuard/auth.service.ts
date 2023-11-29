/**
 * AuthService - Service d'authentification Angular
 * Ce service gère les opérations d'authentification, telles que la connexion, la déconnexion et la vérification de l'état de connexion.
 */

import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    /**
     * Constructeur du service AuthService.
     * @param http - Service HTTP permettant les requêtes réseau.
     * @param stateService - Service de gestion de l'état de l'application.
     * @param config - Service de configuration permettant d'accéder à l'URL de l'API.
     */
    constructor(private http: HttpClient, private stateService: StateService, private config: ConfigService) { }

    /**
     * Effectue une tentative de connexion avec les informations fournies.
     * @param nomUtilisateur - Nom d'utilisateur.
     * @param motDePasse - Mot de passe.
     * @returns Observable<boolean> - Observable indiquant si la connexion a réussi (true) ou échoué (false).
     */
    seConnecter(nomUtilisateur: string, motDePasse: string): Observable<boolean> {
        const credentials = { username: nomUtilisateur, password: motDePasse };

        return this.http.post<any>(`${this.config.apiUrl}auth/login`, credentials, { responseType: 'text' as 'json' })
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

    /**
     * Vérifie si l'utilisateur est actuellement connecté.
     * @returns boolean - True si l'utilisateur est connecté, sinon False.
     */
    estConnecte(): boolean {
        return this.stateService.utilisateurConnecteSubject.value;
    }

    /**
     * Déconnecte l'utilisateur en mettant à jour l'état de connexion.
     */
    seDeconnecter(): void {
        this.stateService.setUtilisateurConnecte(false);
    }
}
