import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { IgracService } from "src/services/IgracService";
import { TimoviService } from "src/services/TimoviService";
import { startWith, map, filter } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-pretragaigrac",
  templateUrl: "./pretragaigrac.component.html",
  styleUrls: ["./pretragaigrac.component.css"]
})
export class PretragaigracComponent implements OnInit {
  pretragaPoTimu: string = "Pretrazite po timu :";
  modPretrage: string = "";
  imeControl = new FormControl();
  pozicijaControl = new FormControl();
  dresControl = new FormControl();
  obsTimIgraca: Observable<any>;
  obsPozicija: Observable<any>;
  obsPocetakImena: Observable<any>;
  obsBrojDresa: Observable<any>;
  obsChild: Observable<any>;
  topStrelci: Object[];
  najIskusnijiIgraci: Object[];
  pozicije: any[] = ["Odbrana", "Napad", "Golman", "Rezerva"];
  rezultatPretrage: Object[];

  constructor(
    private location: Location,
    private igracService: IgracService,
    private timService: TimoviService
  ) {}

  ngOnInit() {
    this.obsTimIgraca = this.timService.getAllTimovi();
    this.dresControl.valueChanges.pipe().subscribe(brojDresa => {
      this.obsPocetakImena = this.igracService.getIgracByNumber(brojDresa + "");
      this.obsPocetakImena.subscribe(data => {
        this.rezultatPretrage = data.data.Igrac;
        this.modPretrage = " po broju dresa :";
      });
    });
    this.imeControl.valueChanges
      .pipe(
        startWith("/[a-zA-Z]/"),
        filter(podatak => podatak.length > 2)
      )
      .subscribe(pocetakImena => {
        this.obsPocetakImena = this.igracService.getIgracStartsWith(
          pocetakImena.charAt(0).toUpperCase() + pocetakImena.slice(1)
        );
        this.obsPocetakImena.subscribe(data => {
          this.rezultatPretrage = data.data.Igrac;
          this.modPretrage = " po imenu :";
        });
      });
    this.pozicijaControl.valueChanges.pipe().subscribe(pozicija => {
      let param = "";
      if (this.pozicijaControl.value == "Rezerva") param = "Rezarva";
      else param = this.pozicijaControl.value;
      this.obsPozicija = this.igracService.getIgracByPosition(param);
      this.obsPozicija.subscribe(data => {
        this.rezultatPretrage = data.data.Igrac;
        this.modPretrage = " po poziciji :";
      });
    });

    this.igracService.getTopStrelci().subscribe(({ data, loading }) => {
      this.topStrelci = data.Igrac.sort(function(igrac1,igrac2){
        return igrac2.golovi.length-igrac1.golovi.length;
      });
      this.topStrelci.splice(5,this.topStrelci.length-1);
    });
    this.igracService.getTopIskustvo().subscribe(data => {
      this.najIskusnijiIgraci = data.data.Igrac.sort(function(igrac1,igrac2){
        return igrac2.utakmice.length-igrac1.utakmice.length;
      });
      this.najIskusnijiIgraci.splice(5,this.najIskusnijiIgraci.length-1);
    });
  }
  goBack() {
    this.location.back();
  }

  pretraziIgraceTima($tim: any) {
    this.rezultatPretrage = [];
    this.obsChild = this.igracService.getIgraciTim($tim);
    this.obsChild.subscribe(data => {
      data.data.Tim[0].igraci.forEach(element => {
        this.rezultatPretrage.push(element.Igrac);
      });
    });
  }
}
