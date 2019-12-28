import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TimoviComponent } from "./timovi/timovi.component";
import { DodajigracaComponent } from './components/dodajigraca/dodajigraca.component';

const routes: Routes = [
  { path: "timovi", component: TimoviComponent },
  { path: "admin/dodajigraca", component: DodajigracaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
