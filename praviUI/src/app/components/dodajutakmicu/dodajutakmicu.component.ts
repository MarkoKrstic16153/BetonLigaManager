import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { TimoviService } from "src/services/TimoviService";
import { IgracService } from "src/services/IgracService";
import { UtakmicaService } from "src/services/UtakmicaService";
import { StadionService } from "src/services/StadionService";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { Igrac } from "src/models/Igrac";
import { Strelac } from "src/models/Strelac";
import { Tim } from "src/models/Tim";

@Component({
  selector: "app-dodajutakmicu",
  templateUrl: "./dodajutakmicu.component.html",
  styleUrls: ["./dodajutakmicu.component.css"]
})
export class DodajutakmicuComponent implements OnInit {
  timovi: any[] = [];
  vremeControl: FormControl = new FormControl("", Validators.required);
  datumControl: FormControl = new FormControl("", Validators.required);
  brojPosetilacaControl: FormControl = new FormControl("", Validators.required);
  nazivControl: FormControl = new FormControl("", Validators.required);
  opisControl: FormControl = new FormControl("", Validators.required);
  timDomaciControl: FormControl = new FormControl("", Validators.required);
  timGostiControl: FormControl = new FormControl("", Validators.required);
  igraciDomaciControl: FormControl = new FormControl("", Validators.required);
  igraciGostiControl: FormControl = new FormControl("", Validators.required);
  strelciDomaciControl: FormControl = new FormControl("", Validators.required);
  strelciGostiControl: FormControl = new FormControl("", Validators.required);
  vremeGolControl: FormControl = new FormControl("", Validators.required);
  sviIgraciDomaci: Igrac[] = []; //svi povuceni sa servera
  sviIgraciGosti: Igrac[] = []; //-||-
  izabraniDomaci: Igrac[] = []; //trenutno na terenu
  izabraniGosti: Igrac[] = []; //-||-
  ukupnoIzabraniDomaci: Igrac[] = []; //dodati vezu da su ucestvovali na utakmici
  ukupnoIzabraniGosti: Igrac[] = []; //-||-

  strelciDomaci: Strelac[] = []; //strelci
  strelciGosti: Strelac[] = []; //-||-
  domaciGolovi: number = 0;
  gostiGolovi: number = 0;
  stadionDomacih: string = "";

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
    this.utakmicaService
      .createUtakmica(
        this.nazivControl.value,
        this.datumControl.value,
        this.vremeControl.value,
        this.opisControl.value
      )
      .subscribe(data => {
        this.utakmicaService
          .addTeamToUtakmica(
            this.timDomaciControl.value,
            this.datumControl.value,
            this.vremeControl.value,
            "domacin",
            this.domaciGolovi + ""
          )
          .subscribe(() => {
            this.utakmicaService
              .addTeamToUtakmica(
                this.timGostiControl.value,
                this.datumControl.value,
                this.vremeControl.value,
                "gost",
                this.gostiGolovi + ""
              )
              .subscribe(() => {
                this.utakmicaService
                  .addUtakmicaStadion(
                    this.datumControl.value,
                    this.vremeControl.value,
                    this.stadionDomacih,
                    this.brojPosetilacaControl.value
                  )
                  .subscribe(() => {
                    this.ukupnoIzabraniDomaci.forEach((igrac: Igrac) => {
                      this.igracService
                        .addIgracToUtakmica(
                          igrac.brojTelefona,
                          this.datumControl.value,
                          this.vremeControl.value
                        )
                        .subscribe();
                    });
                    this.ukupnoIzabraniGosti.forEach((igrac: Igrac) => {
                      this.igracService
                        .addIgracToUtakmica(
                          igrac.brojTelefona,
                          this.datumControl.value,
                          this.vremeControl.value
                        )
                        .subscribe();
                    });
                    this.strelciDomaci.forEach((strelac: Strelac) => {
                      this.igracService
                        .addIgracGol(
                          strelac.Igrac.brojTelefona,
                          this.datumControl.value,
                          this.vremeControl.value,
                          strelac.vreme
                        )
                        .subscribe();
                    });
                    this.strelciGosti.forEach((strelac: Strelac) => {
                      this.igracService
                        .addIgracGol(
                          strelac.Igrac.brojTelefona,
                          this.datumControl.value,
                          this.vremeControl.value,
                          strelac.vreme
                        )
                        .subscribe();
                    });

                    this.timService
                      .getTim(this.timDomaciControl.value)
                      .subscribe(({ data }) => {
                        console.log(data.Tim[0]);
                        let updateTim1: Tim = {
                          brojPobeda:
                            data.Tim[0].brojPobeda + this.pobedaDomacina(),
                          brojPoraza:
                            data.Tim[0].brojPoraza + this.porazDomacina(),
                          nereseno: data.Tim[0].nereseno + this.nereseno(),
                          brojPoenaTabela:
                            data.Tim[0].brojPoenaTabela +
                            this.updatePoeniDomaci(),
                          opis: data.Tim[0].opis,
                          postignutiGolovi:
                            data.Tim[0].postignutiGolovi + this.domaciGolovi,
                          primljeniGolovi:
                            data.Tim[0].primljeniGolovi + this.gostiGolovi,
                          naziv: data.Tim[0].naziv
                        };
                        this.timService.updateTim(updateTim1).subscribe(() => {
                          this.timService
                            .getTim(this.timGostiControl.value)
                            .subscribe(({ data }) => {
                              console.log(data.Tim[0]);
                              let updateTim2: Tim = {
                                brojPobeda:
                                  data.Tim[0].brojPobeda + this.pobedaGosti(),
                                brojPoraza:
                                  data.Tim[0].brojPoraza + this.porazGosti(),
                                nereseno:
                                  data.Tim[0].nereseno + this.nereseno(),
                                brojPoenaTabela:
                                  data.Tim[0].brojPoenaTabela +
                                  this.updatePoeniGosti(),
                                opis: data.Tim[0].opis,
                                postignutiGolovi:
                                  data.Tim[0].postignutiGolovi +
                                  this.gostiGolovi,
                                primljeniGolovi:
                                  data.Tim[0].primljeniGolovi +
                                  this.domaciGolovi,
                                naziv: data.Tim[0].naziv
                              };
                              this.timService
                                .updateTim(updateTim2)
                                .subscribe(() => {
                                  window.location.reload();
                                });
                            });
                        });
                      });
                  });
                //bio ovamo
              });
          });
      });
  }
  pobedaDomacina(): number {
    if (this.domaciGolovi > this.gostiGolovi) return 1;
    else return 0;
  }
  porazDomacina(): number {
    if (this.domaciGolovi < this.gostiGolovi) return 1;
    else return 0;
  }
  pobedaGosti(): number {
    if (this.gostiGolovi > this.domaciGolovi) return 1;
    else return 0;
  }
  porazGosti(): number {
    if (this.gostiGolovi < this.domaciGolovi) return 1;
    else return 0;
  }
  nereseno(): number {
    if (this.gostiGolovi == this.domaciGolovi) return 1;
    else return 0;
  }
  updatePoeniDomaci(): number {
    if (this.pobedaDomacina() == 1) return 3;
    else if (this.nereseno() == 1) return 1;
    else return 0;
  }
  updatePoeniGosti(): number {
    if (this.pobedaGosti() == 1) return 3;
    else if (this.nereseno() == 1) return 1;
    else return 0;
  }
  dajGolDomaci(strelac: Igrac) {
    if (this.vremeGolControl.value != "") {
      this.domaciGolovi++;
      let noviStrelac: Strelac = {
        Igrac: strelac,
        vreme: this.vremeGolControl.value
      };
      this.strelciDomaci.push(noviStrelac);
    }
  }
  dajGolGosti(strelac: Igrac) {
    if (this.vremeGolControl.value != "") {
      this.gostiGolovi++;
      let noviStrelac: Strelac = {
        Igrac: strelac,
        vreme: this.vremeGolControl.value
      };
      this.strelciGosti.push(noviStrelac);
    }
  }

  dodajIgracaDomacih() {
    if (!this.izabraniDomaci.includes(this.igraciDomaciControl.value)) {
      this.izabraniDomaci.push(this.igraciDomaciControl.value);
      this.ukupnoIzabraniDomaci.push(this.igraciDomaciControl.value);
    }
  }
  dodajIgracaGostujucih() {
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
      this.stadionService
        .getTimStadion(this.timDomaciControl.value)
        .subscribe(({ data, loading }) => {
          this.stadionDomacih = data.Tim[0].stadion[0].Stadion.naziv;
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
