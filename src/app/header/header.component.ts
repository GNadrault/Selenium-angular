import { Component, OnInit } from '@angular/core';
import { Recherche } from '../domain/models/recherche';
import { ServiceRecherche } from '../domain/services/recherche.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  recherche = '';
  resultatRecherche: Recherche;

  constructor(private serviceRecherche: ServiceRecherche) { }

  ngOnInit() {
    this.serviceRecherche.currentRecherche.subscribe(
      r => this.resultatRecherche = r,
      e => console.log(e));
  }

}
