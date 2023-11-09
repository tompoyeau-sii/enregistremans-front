// app.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { StateService } from './services/state/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  afficherAppbar: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.stateService.utilisateurConnecte$.subscribe((etat) => {
      this.afficherAppbar = etat;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.afficherAppbar = !this.isPageDeConnexion();
      }
    });
  }

  private isPageDeConnexion(): boolean {
    return this.activatedRoute.snapshot.firstChild?.routeConfig?.path === '';
  }
}
