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
    return this.http.get(this.apiUrl);
  }

  delManager(managerId: number): Observable<any> {
    const deleteUrl = `http://localhost:8080/Manager/${managerId}`;
    return this.http.delete(deleteUrl);
  }

  addManager(newManagerName: string) {
    // Envoyer une requête POST à l'API pour ajouter le manager
    const managerData = { fullname: newManagerName };
    return this.http.post(this.apiUrl, managerData);
  }
}
