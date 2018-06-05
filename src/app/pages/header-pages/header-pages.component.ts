import { Component, OnInit } from '@angular/core';
import { ListPagesComponent } from '../list-pages/list-pages.component';
import { Page } from '../../domain/models/page';
import { ServicePage } from '../../domain/services/page.service';
import { Rapport } from '../../domain/models/rapport';
import { Subject } from 'rxjs/Subject';
import { InfoTest } from '../../domain/models/infoTest';
import { Test } from '../../domain/models/test';

@Component({
  selector: 'app-header-pages',
  templateUrl: './header-pages.component.html',
  styleUrls: ['./header-pages.component.scss']
})
export class HeaderPagesComponent implements OnInit {

  tests: Array<Test>;
  selectedOne: boolean;
  rapport: Rapport;
  navigateurs = ['Chrome', 'Firefox', 'Edge', 'Local'];
  navigateurSelected: string;
  newReport = false;

  constructor(private servicePage: ServicePage) { }

  ngOnInit() {
    this.servicePage.selectedOne.subscribe(selected => this.selectedOne = selected,
      e => console.log(e));
    this.servicePage.currentRapport.subscribe(rp => {
      this.rapport = rp;
      this.newReport = true;
    },
      e => console.log(e));
    this.servicePage.currentTests.subscribe(t => this.tests = t,
      e => console.log(e));
    this.navigateurSelected = this.navigateurs[0];
  }

  onTester() {
    const infoTest = new InfoTest();
    infoTest.tests = this.tests;
    infoTest.navigateur = this.navigateurSelected;
    this.servicePage.launchTests(infoTest)
      .subscribe(rp => this.servicePage.changeRapport(rp),
        e => console.log(e));
    this.newReport = false;
  }
}
