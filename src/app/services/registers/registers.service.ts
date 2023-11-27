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
}
