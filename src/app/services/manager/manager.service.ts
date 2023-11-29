/**
 * ManagerService - Service de gestion des gestionnaires (managers) Angular
 * Ce service offre des méthodes pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur les gestionnaires.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  /**
   * Constructeur du service ManagerService.
   * @param http - Service HTTP permettant les requêtes réseau.
   * @param config - Service de configuration permettant d'accéder à l'URL de l'API.
   */
  constructor(private http: HttpClient, private config: ConfigService) { }

  /**
   * Récupère la liste complète des gestionnaires depuis l'API.
   * @returns Observable<any> - Observable contenant la liste des gestionnaires.
   */
  getManagers(): Observable<any> {
    const managersUrl = `${this.config.apiUrl}Managers`;
    return this.http.get(managersUrl);
  }

  /**
   * Récupère la liste des gestionnaires actifs depuis l'API.
   * @returns Observable<any> - Observable contenant la liste des gestionnaires actifs.
   */
  getActiveManagers(): Observable<any> {
    const activeManagersUrl = `${this.config.apiUrl}Managers/active`; // Utilise un endpoint spécifique pour les gestionnaires actifs
    return this.http.get(activeManagersUrl);
  }

  /**
   * Supprime un gestionnaire spécifié par son identifiant depuis l'API.
   * @param managerId - Identifiant du gestionnaire à supprimer.
   * @returns Observable<any> - Observable indiquant le résultat de la suppression.
   */
  delManager(managerId: number): Observable<any> {
    const deleteUrl = `${this.config.apiUrl}Manager/${managerId}`;
    return this.http.delete(deleteUrl);
  }

  /**
   * Ajoute un nouveau gestionnaire avec le nom spécifié à l'API.
   * @param newManagerName - Nom du nouveau gestionnaire à ajouter.
   * @returns Observable<any> - Observable indiquant le résultat de l'ajout.
   */
  addManager(newManagerName: string): Observable<any> {
    // Envoyer une requête POST à l'API pour ajouter le gestionnaire
    const managerData = { fullname: newManagerName, active: true };
    return this.http.post(this.config.apiUrl, managerData);
  }

  /**
   * Met à jour l'état d'un gestionnaire spécifié par son identifiant depuis l'API.
   * @param managerId - Identifiant du gestionnaire à mettre à jour.
   * @param managerState - Nouvel état du gestionnaire (actif ou inactif).
   * @returns Observable<any> - Observable indiquant le résultat de la mise à jour.
   */
  updateManager(managerId: number, managerState: boolean): Observable<any> {
    // Envoyer une requête PUT à l'API pour mettre à jour le gestionnaire
    const updateUrl = `${this.config.apiUrl}Manager/${managerId}`;
    const managerData = { active: managerState };
    return this.http.put(updateUrl, managerData);
  }
}
