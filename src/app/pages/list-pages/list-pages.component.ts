import { Component, OnInit, Output, Input, HostListener } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { EventEmitter } from 'events';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderPagesComponent } from '../header-pages/header-pages.component';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Page } from '../../domain/models/page';
import { ServicePage } from '../../domain/services/page.service';
import { Test } from '../../domain/models/test';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.scss']
})
export class ListPagesComponent implements OnInit {

  pages: Page[];
  tests: Array<Test>;
  checkedAll = false;

  constructor(private servicePage: ServicePage,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.servicePage.getAllPages()
      .subscribe(p => this.pages = p,
        e => console.log(e));
    this.servicePage.currentTests.subscribe(t => this.tests = t,
      e => console.log(e));
    this.servicePage.currentPages.subscribe(p => this.pages = p,
      e => console.log(e));
    this.changePages();
    this.changeTests();
  }

  onChangeAll() {
    this.pages.forEach(page => {
      page.selected = !this.checkedAll;
    });
    this.checkedAll = !this.checkedAll;
    this.rechercheTests();
    this.changePages();
    this.changeTests();
  }

  onChangeOne(page: Page) {
    page.selected = !page.selected;
    this.rechercheTests();
    this.checkAllSelected();
    this.changePages();
    this.changeTests();
  }

  rechercheTests() {
    this.tests = new Array<Test>();
    this.pages.forEach(page => {
      if (page.selected) {
        page.testsPage.forEach(test => {
          if (this.tests.find(t => t.name === test.name) === undefined) {
            this.tests.push(test);
          }
        });
      }
    });
  }

  checkAllSelected() {
    if (this.pages.find(p => !p.selected) == null) {
      this.checkedAll = true;
    } else {
      this.checkedAll = false;
    }
  }

  changePages() {
    this.servicePage.changePages(this.pages);
  }

  changeTests() {
    this.servicePage.changeTests(this.tests);
  }

}
