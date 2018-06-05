import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Page } from '../../domain/models/page';
import { ServicePage } from '../../domain/services/page.service';
import { Test } from '../../domain/models/test';

@Component({
  selector: 'app-list-tests',
  templateUrl: './list-tests.component.html',
  styleUrls: ['./list-tests.component.scss']
})
export class ListTestsComponent implements OnInit {

  tests = new Array<Test>();

  constructor(private servicePage: ServicePage,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.servicePage.currentTests.subscribe(t => this.tests = t,
                                            e => console.log(e));
  }
}
