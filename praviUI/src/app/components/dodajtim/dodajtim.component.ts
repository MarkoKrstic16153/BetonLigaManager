import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { TimoviService } from "src/services/TimoviService";
import { Tim } from "src/models/Tim";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { LigaService } from 'src/services/LigaService';
import { Liga } from 'src/models/Liga';

@Component({
  selector: "app-dodajtim",
  templateUrl: "./dodajtim.component.html",
  styleUrls: ["./dodajtim.component.css"]
})
export class DodajtimComponent implements OnInit {
  nazivControl: FormControl = new FormControl("", Validators.required);
  opisControl: FormControl = new FormControl("", Validators.required);
  ligaControl: FormControl = new FormControl("",Validators.required);
  lige:Liga[]=[];
  constructor(
    private timService: TimoviService,
    private ligaSevice: LigaService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.ligaSevice.getAllLiga().subscribe(({data})=>this.lige=data.Liga);
  }

  dodajTim() {
    let noviTim: Tim = {
      opis: this.opisControl.value,
      naziv: this.nazivControl.value,
      brojPobeda: 0,
      brojPoenaTabela: 0,
      brojPoraza: 0,
      nereseno: 0,
      postignutiGolovi: 0,
      primljeniGolovi: 0
    };
    console.log(noviTim);
    console.log(this.ligaControl.value);
    this.timService.createTim(noviTim).subscribe(data => {
      this.timService.addTimLiga(noviTim.naziv, this.ligaControl.value+"").subscribe(() => {this.router.navigate(["/admin"]);window.location.reload()});
    });
  }

  goBack() {
    this.location.back();
  }
}
