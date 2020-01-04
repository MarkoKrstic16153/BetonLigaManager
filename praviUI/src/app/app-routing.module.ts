import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DodajigracaComponent } from './components/dodajigraca/dodajigraca.component';
import { DodajstadionComponent } from './components/dodajstadion/dodajstadion.component';
import { DodajtimComponent } from './components/dodajtim/dodajtim.component';
import { DodajutakmicuComponent } from './components/dodajutakmicu/dodajutakmicu.component';
import { AdminrouterComponent } from './components/adminrouter/adminrouter.component';
import { MainrouterComponent } from './components/mainrouter/mainrouter.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { PretragatimComponent } from './components/pretragatim/pretragatim.component';
import { PretragaigracComponent } from './components/pretragaigrac/pretragaigrac.component';
import { PretragastadionComponent } from './components/pretragastadion/pretragastadion.component';
import { PretragautakmicaComponent } from './components/pretragautakmica/pretragautakmica.component';
import { UtakmicaComponent } from './components/utakmica/utakmica.component';
import { IgracComponent } from './components/igrac/igrac.component';
import { TimComponent } from './components/tim/tim.component';
import { StadionComponent } from './components/stadion/stadion.component';

const routes: Routes = [
  { path: "admin/dodajigraca", component: DodajigracaComponent },
  { path: "admin/dodajstadion", component: DodajstadionComponent },
  { path: "admin/dodajtim", component: DodajtimComponent },
  { path: "admin/dodajutakmicu", component: DodajutakmicuComponent },
  { path: "admin", component: AdminrouterComponent },
  { path: "tabela", component: TabelaComponent },
  { path: "pretraziutakmice/utakmica/:datum/:vreme", component: UtakmicaComponent },
  { path: "pretraziigrace/igrac/:id", component: IgracComponent },
  { path: "pretrazitimove/tim/:nazivTima", component: TimComponent },
  { path: "pretrazistadione/stadion/:nazivStadiona", component: StadionComponent },
  { path: "pretrazitimove", component: PretragatimComponent },
  { path: "pretraziigrace", component: PretragaigracComponent },
  { path: "pretrazistadione", component: PretragastadionComponent },
  { path: "pretraziutakmice", component: PretragautakmicaComponent },
  { path: "", component: MainrouterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
