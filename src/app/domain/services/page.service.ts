import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Page } from '../models/page';
import { Test } from '../models/test';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Rapport } from '../models/rapport';
import { InfoTest } from '../models/infoTest';

@Injectable()
export class ServicePage {

    urlPages = 'http://localhost:8181/sie/pages';

    // Observable liste des pages sélectionnées
    pages: Page[] = [];
    private pagesSource = new BehaviorSubject<Page[]>(this.pages);
    currentPages = this.pagesSource.asObservable();

    // Observable liste des tests
    tests = new Array<Test>();
    private testsSource = new BehaviorSubject<Array<Test>>(this.tests);
    currentTests = this.testsSource.asObservable();

    // Observable au moins 1 page sélectionnée
    private selectedSubject = new Subject<boolean>();
    selectedOne = this.selectedSubject.asObservable();
    private test = false;

    rapport: Rapport;
    private rapportSubject = new BehaviorSubject<Rapport>(this.rapport);
    currentRapport = this.rapportSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    changePages(pages: Page[]) {
        this.pagesSource.next(pages);
        this.checkSelectedOne(pages);
    }

    changeTests(tests: Array<Test>) {
        this.testsSource.next(tests);
    }

    changeRapport(rapport: Rapport) {
        console.log('MAJ Rapport: ' + rapport.chemin);
        this.rapportSubject.next(rapport);
    }

    getAllPages(): Observable<Array<Page>> {
        return this.http.get<Array<Page>>(this.urlPages);
    }

    launchTests(infoTest: InfoTest): Observable<Rapport> {
        return this.http.post<Rapport>(this.urlPages, infoTest);
    }

    filtrerPage(pages: Page[]): Page[] {
        pages = pages.filter(p => p.selected === true);
        pages.forEach(element => {
            console.log(element.name);
        });
        return pages;
    }

    checkSelectedOne(pages: Page[]) {
        let count = 0;
        pages.forEach(element => {
            if (element.selected) {
                count++;
            }
        });
        if (count === 0) {
            this.selectedSubject.next(false);
        } else {
            this.selectedSubject.next(true);
        }
    }
}
