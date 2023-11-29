// Service permettant de définir l'adresse de l'api
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    // apiUrl: string = 'https://localhost:8080/';
    apiUrl: string = 'https://register-7y7k.onrender.com/';

}
