import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { RapportComponent } from './rapport/rapport.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicePage } from './domain/services/page.service';
import { ListPagesComponent } from './pages/list-pages/list-pages.component';
import { ListTestsComponent } from './pages/list-tests/list-tests.component';
import { HeaderPagesComponent } from './pages/header-pages/header-pages.component';
import { HeaderRapportComponent } from './rapport/header-rapport/header-rapport.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServiceRecherche } from './domain/services/recherche.service';


@NgModule({
  declarations: [
    AppComponent,
    ListPagesComponent,
    RapportComponent,
    ListTestsComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    HeaderPagesComponent,
    HeaderRapportComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    HttpModule,
    ServicePage,
    ServiceRecherche
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
