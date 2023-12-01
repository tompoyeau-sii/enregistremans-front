import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getManagers(): Observable<any> {
    const managers = `${this.config.apiUrl}Managers`
    return this.http.get(managers);
  }

  getActiveManagers(): Observable<any> {
    const activeManagersUrl = `${this.config.apiUrl}Managers/active`; // Utilisez un endpoint spécifique pour les managers actifs
    return this.http.get(activeManagersUrl);
  }

  delManager(managerId: number): Observable<any> {
    const deleteUrl = `${this.config.apiUrl}Manager/${managerId}`;
    return this.http.delete(deleteUrl);
  }

  addManager(newManagerName: string) {
    // Envoyer une requête POST à l'API pour ajouter le manager
    const managers = `${this.config.apiUrl}Managers`
    const managerData = { fullname: newManagerName, active: true };
    return this.http.post(managers, managerData);
  }

  updateManager(managerId: number, managerState: boolean) {
    // Envoyer une requête PUT à l'API pour mettre à jour le manager
    const updateUrl = `${this.config.apiUrl}Manager/${managerId}`;
    const managerData = { active: managerState };
    return this.http.put(updateUrl, managerData);
  }
}