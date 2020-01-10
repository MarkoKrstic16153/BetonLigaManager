import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { TimoviService } from "src/services/TimoviService";
import { IgracService } from "src/services/IgracService";
import { Igrac } from "src/models/Igrac";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-dodajigraca",
  templateUrl: "./dodajigraca.component.html",
  styleUrls: ["./dodajigraca.component.css"]
})
export class DodajigracaComponent implements OnInit {
  timovi: any[] = [];
  pozicije: string[] = ["Odbrana", "Napad", "Golman", "Rezarva"];
  imeControl: FormControl = new FormControl("", Validators.required);
  prezimeControl: FormControl = new FormControl("", Validators.required);
  brojDresaControl: FormControl = new FormControl("", Validators.required);
  godRodjenjaControl: FormControl = new FormControl("", Validators.required);
  brojTelefonaControl: FormControl = new FormControl("", Validators.required);
  opisControl: FormControl = new FormControl("", Validators.required);
  plataControl: FormControl = new FormControl("", Validators.required);
  pozicijaControl: FormControl = new FormControl("", Validators.required);
  timControl: FormControl = new FormControl("", Validators.required);

  constructor(
    private timService: TimoviService,
    private igracService: IgracService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.timService.getAllTimovi().subscribe(podaci => {
      this.timovi = podaci.data.Tim;
      console.log(this.timovi);
    });
  }
  dodajIgraca() {
    let noviIgrac: Igrac = {
      ime: this.imeControl.value,
      brojDresa: this.brojDresaControl.value,
      brojTelefona: this.brojTelefonaControl.value,
      godRodjenja: this.godRodjenjaControl.value,
      opis: this.opisControl.value,
      pozicija: this.pozicijaControl.value,
      prezime: this.prezimeControl.value
    };
    console.log(noviIgrac);
    console.log(this.timControl.value);
    this.igracService
      .addIgrac(noviIgrac, this.timControl.value)
      .subscribe(data => {
        console.log(data);
        this.igracService
          .addIgracToTim(noviIgrac.brojTelefona, this.timControl.value,this.plataControl.value)
          .subscribe(() => this.router.navigate(["/admin"]));
      });
  }
  goBack() {
    this.location.back();
  }
}
