import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimoviComponent } from './timovi/timovi.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TimComponent } from './components/tim/tim.component';
import { IgracComponent } from './components/igrac/igrac.component';
import { UtakmicaComponent } from './components/utakmica/utakmica.component';
import { LigaComponent } from './components/liga/liga.component';
import { StadionComponent } from './components/stadion/stadion.component';
import { DodajigracaComponent } from './components/dodajigraca/dodajigraca.component';
import { DodajstadionComponent } from './components/dodajstadion/dodajstadion.component';
import { DodajtimComponent } from './components/dodajtim/dodajtim.component';
import { DodajutakmicuComponent } from './components/dodajutakmicu/dodajutakmicu.component';

@NgModule({
  declarations: [
    AppComponent,
    TimoviComponent,
    TimComponent,
    IgracComponent,
    UtakmicaComponent,
    LigaComponent,
    StadionComponent,
    DodajigracaComponent,
    DodajstadionComponent,
    DodajtimComponent,
    DodajutakmicuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
