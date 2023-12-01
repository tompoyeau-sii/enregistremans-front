import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getRegisters(): Observable<any> {
    return this.http.get(`${this.config.apiUrl}Registers`);
  }
  updateRegister(registerId: number, registerHere: boolean) {
    // Envoyer une requête PUT à l'API pour mettre à jour le manager
    const updateUrl = `${this.config.apiUrl}Register/${registerId}`;
    const managerData = { here: registerHere };
    return this.http.put(updateUrl, managerData);
  }
}
