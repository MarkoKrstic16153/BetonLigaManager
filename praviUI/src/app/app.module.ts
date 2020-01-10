import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TimComponent } from './components/tim/tim.component';
import { IgracComponent } from './components/igrac/igrac.component';
import { UtakmicaComponent } from './components/utakmica/utakmica.component';
import { StadionComponent } from './components/stadion/stadion.component';
import { DodajigracaComponent } from './components/dodajigraca/dodajigraca.component';
import { DodajstadionComponent } from './components/dodajstadion/dodajstadion.component';
import { DodajtimComponent } from './components/dodajtim/dodajtim.component';
import { DodajutakmicuComponent } from './components/dodajutakmicu/dodajutakmicu.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdminrouterComponent } from './components/adminrouter/adminrouter.component';
import { MainrouterComponent } from './components/mainrouter/mainrouter.component';
import { PretragaigracComponent } from './components/pretragaigrac/pretragaigrac.component';
import { PretragatimComponent } from './components/pretragatim/pretragatim.component';
import { PretragastadionComponent } from './components/pretragastadion/pretragastadion.component';
import { PretragautakmicaComponent } from './components/pretragautakmica/pretragautakmica.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { SmartSearchBarComponent } from './components/smart-search-bar/smart-search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DodajliguComponent } from './components/dodajligu/dodajligu.component';


@NgModule({
  declarations: [
    AppComponent,
    TimComponent,
    IgracComponent,
    UtakmicaComponent,
    StadionComponent,
    DodajigracaComponent,
    DodajstadionComponent,
    DodajtimComponent,
    DodajutakmicuComponent,
    AdminrouterComponent,
    MainrouterComponent,
    PretragaigracComponent,
    PretragatimComponent,
    PretragastadionComponent,
    PretragautakmicaComponent,
    TabelaComponent,
    SmartSearchBarComponent,
    DodajliguComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
