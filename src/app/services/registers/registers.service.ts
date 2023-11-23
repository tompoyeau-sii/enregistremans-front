import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {
  private apiUrl = 'https://register-7y7k.onrender.com/Registers';

  constructor(private http: HttpClient) { }

  getRegisters(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
