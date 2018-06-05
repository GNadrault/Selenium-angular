import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RapportComponent } from './rapport/rapport.component';
import { PagesComponent } from './pages/pages.component';
import { ListTestsComponent } from './pages/list-tests/list-tests.component';
import { ListPagesComponent } from './pages/list-pages/list-pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {path: 'pages', component: PagesComponent, children: [
      { path: '', component: ListPagesComponent, outlet: 'list-pages' },
      { path: '', component: ListTestsComponent, outlet: 'list-tests' }
    ]
  },
  { path: 'rapport', component: RapportComponent },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
