import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { TimoviService } from "src/services/TimoviService";
import { Router } from "@angular/router";

@Component({
  selector: "app-pretragatim",
  templateUrl: "./pretragatim.component.html",
  styleUrls: ["./pretragatim.component.css"]
})
export class PretragatimComponent implements OnInit {
  pretragaPoImenu: string = "Pretrazite po imenu tima : ";
  obsTimovi: Observable<any>;
  listaSvihTimova: Object[];
  listaLidera: Object[] = [];
  constructor(
    private location: Location,
    private timService: TimoviService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obsTimovi = this.timService.getAllTimovi();
    this.obsTimovi.subscribe(({ data, loading }) => {
      this.listaSvihTimova = data.Tim;
    });
    this.timService.getSortTimovi().subscribe(({ data, loading }) => {
      let pomLista: [] = data.Tim;
      this.listaLidera[0] =
        pomLista[this.duzina(pomLista) - this.duzina(pomLista)];
      this.listaLidera[1] =
        pomLista[this.duzina(pomLista) - this.duzina(pomLista) + 1];
      this.listaLidera[2] =
        pomLista[this.duzina(pomLista) - this.duzina(pomLista) + 2];
    });
  }
  duzina(param) {
    return param.length;
  }

  goBack() {
    this.location.back();
  }

  pretraziTim($tim: any) {
    console.log($tim); //rutiraj na tu stranu tima
    this.router.navigate(["/pretrazitimove/tim/", $tim]);
  }
}
