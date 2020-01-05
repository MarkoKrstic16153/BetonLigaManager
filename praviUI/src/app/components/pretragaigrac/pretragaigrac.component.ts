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
      this.topStrelci = data.Igrac;
    });
    this.igracService.getTopIskustvo().subscribe(data => {
      console.log(data.data.Igrac); //kod mene je prazna baza tako da ne mogu da testiram ovo ali msm da je ok;
      this.najIskusnijiIgraci = data.data.Igrac;
    });
  }
  goBack() {
    this.location.back();
  }

  pretraziIgraceTima($tim: any) {
    this.rezultatPretrage = [];
    console.log($tim);
    this.obsChild = this.igracService.getIgraciTim($tim);
    this.obsChild.subscribe(data => {
      console.log(data.data.Tim);
      data.data.Tim[0].igraci.forEach(element => {
        this.rezultatPretrage.push(element.Igrac);
      });
      console.log(this.rezultatPretrage);
    });
  }
}
