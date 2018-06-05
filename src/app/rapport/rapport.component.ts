import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ServicePage } from '../domain/services/page.service';
import { Rapport } from '../domain/models/rapport';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

  rapport: Rapport;
  cheminRapport: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer, private servicePage: ServicePage) {
  }

  ngOnInit() {
    this.servicePage.currentRapport.subscribe(rp => this.rapport = rp,
                                              e => console.log(e));
    console.log(this.rapport.chemin);
    this.cheminRapport = this.sanitizer.bypassSecurityTrustResourceUrl(this.rapport.chemin);
  }
}
