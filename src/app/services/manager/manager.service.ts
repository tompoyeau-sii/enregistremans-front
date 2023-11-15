import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = 'http://localhost:8080/Managers';

  constructor(private http: HttpClient) { }

  getManagers(): Observable<any> {
    console.log(this.http.get(this.apiUrl))
    return this.http.get(this.apiUrl);
  }

  getActiveManagers(): Observable<any> {
    const activeManagersUrl = `${this.apiUrl}/active`; // Utilisez un endpoint spécifique pour les managers actifs
    return this.http.get(activeManagersUrl);
  }

  delManager(managerId: number): Observable<any> {
    const deleteUrl = `http://localhost:8080/Manager/${managerId}`;
    return this.http.delete(deleteUrl);
  }

  addManager(newManagerName: string) {
    // Envoyer une requête POST à l'API pour ajouter le manager
    const managerData = { fullname: newManagerName, active: true };
    return this.http.post(this.apiUrl, managerData);
  }

  updateManager(managerId: number, managerState: boolean) {
    // Envoyer une requête PUT à l'API pour mettre à jour le manager
    const updateUrl = `http://localhost:8080/Manager/${managerId}`;
    const managerData = { active: managerState };
    return this.http.put(updateUrl, managerData);
  }
}
