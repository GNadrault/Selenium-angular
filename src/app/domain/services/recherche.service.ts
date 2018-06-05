import { Injectable } from '@angular/core';
import { Recherche } from '../models/recherche';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { ServicePage } from './page.service';


@Injectable()
export class ServiceRecherche {

    recherche: Recherche;
    private rechercheSubject = new BehaviorSubject<Recherche>(this.recherche);
    currentRecherche = this.rechercheSubject.asObservable();

    constructor(private http: HttpClient, private servicePage: ServicePage) {}

    changeRecherche(recherche: Recherche) {
        this.rechercheSubject.next(recherche);
    }

}
