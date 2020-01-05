import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { TimoviService } from "src/services/TimoviService";
import { IgracService } from "src/services/IgracService";
import { UtakmicaService } from "src/services/UtakmicaService";
import { StadionService } from "src/services/StadionService";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-dodajutakmicu",
  templateUrl: "./dodajutakmicu.component.html",
  styleUrls: ["./dodajutakmicu.component.css"]
})
export class DodajutakmicuComponent implements OnInit {
  timovi: any[] = [];
  vremeControl: FormControl = new FormControl("", Validators.required);
  datumControl: FormControl = new FormControl("", Validators.required);
  nazivControl: FormControl = new FormControl("", Validators.required);
  opisControl: FormControl = new FormControl("", Validators.required);
  timDomaciControl: FormControl = new FormControl("", Validators.required);
  timGostiControl: FormControl = new FormControl("", Validators.required);
  igraciDomaciControl: FormControl = new FormControl("", Validators.required);
  igraciGostiControl: FormControl = new FormControl("", Validators.required);
  strelciDomaciControl: FormControl = new FormControl("", Validators.required);
  strelciGostiControl: FormControl = new FormControl("", Validators.required);
  vremeGolControl: FormControl = new FormControl("", Validators.required);
  sviIgraciDomaci: string[] = [];
  sviIgraciGosti: string[] = [];
  izabraniDomaci: string[] = [];
  izabraniGosti: string[] = [];
  ukupnoIzabraniDomaci: string[] = [];
  ukupnoIzabraniGosti: string[] = [];
  strelciDomaci: string[] = [];
  strelciGosti: string[] = [];
  domaciGolovi: number = 0;
  gostiGolovi: number = 0;
  stadionDomacih: string = "Ovde stadion domacih";

  constructor(
    private timService: TimoviService,
    private igracService: IgracService,
    private utakmicaService: UtakmicaService,
    private stadionService: StadionService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.timService.getAllTimovi().subscribe(podaci => {
      this.timovi = podaci.data.Tim;
      console.log(this.timovi);
    });
  }
  dodajUtakmicu() {
    this.router.navigate(["/admin"]);
  }
  dajGolDomaci(strelac: string) {
    this.domaciGolovi++;
    this.strelciDomaci.push(strelac + " " + this.vremeGolControl.value);
  }
  dajGolGosti(strelac: string) {
    this.gostiGolovi++;
    this.strelciGosti.push(strelac + " " + this.vremeGolControl.value);
  }

  dodajIgracaDomacih() {
    console.log(this.igraciDomaciControl.value);
    if (!this.izabraniDomaci.includes(this.igraciDomaciControl.value)) {
      this.izabraniDomaci.push(this.igraciDomaciControl.value);
      this.ukupnoIzabraniDomaci.push(this.igraciDomaciControl.value);
    }
  }
  dodajIgracaGostujucih() {
    console.log(this.igraciGostiControl.value);
    if (!this.izabraniGosti.includes(this.igraciGostiControl.value)) {
      this.izabraniGosti.push(this.igraciGostiControl.value);
      this.ukupnoIzabraniGosti.push(this.igraciGostiControl.value);
    }
  }
  izbaciIzTima(igrac: string, tim: string[]) {
    var index = tim.indexOf(igrac);
    if (index > -1) {
      tim.splice(index, 1);
    }
  }
  daLiSuEkipeIste(): Boolean {
    if (
      this.timDomaciControl.value == this.timGostiControl.value &&
      this.timGostiControl.value != ""
    )
      return true;
    else return false;
  }
  daLiEkipeNisuIzabrane(): Boolean {
    if (this.timDomaciControl.value == "" || this.timGostiControl.value == "")
      return true;
    else return false;
  }
  ekipeSetovane() {
    if (this.izabraniDomaci.length == 5 && this.izabraniGosti.length == 5)
      return true;
    else return false;
  }

  timoviSelectChange() {
    if (!(this.daLiEkipeNisuIzabrane() || this.daLiSuEkipeIste())) {
      console.log(this.timDomaciControl.value + this.timGostiControl.value);
      this.igracService
        .getIgraciTim(this.timDomaciControl.value)
        .subscribe(podaci => {
          this.sviIgraciDomaci = podaci.data.Tim[0].igraci;
          console.log(this.sviIgraciDomaci);
        });
      this.igracService
        .getIgraciTim(this.timGostiControl.value)
        .subscribe(podaci => {
          this.sviIgraciGosti = podaci.data.Tim[0].igraci;
          console.log(this.sviIgraciGosti);
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
