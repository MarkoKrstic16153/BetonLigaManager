import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { TimoviService } from 'src/services/TimoviService';
import { UtakmicaService } from 'src/services/UtakmicaService';

@Component({
  selector: 'app-pretragautakmica',
  templateUrl: './pretragautakmica.component.html',
  styleUrls: ['./pretragautakmica.component.css']
})
export class PretragautakmicaComponent implements OnInit {
  pretragaPoImenuTima:string="Pretrazite po imenu tima : ";
  pretragaPoImenuDomacina:string="Pretrazite po domacinu : ";
  pretragaPoImenuGosta:string="Pretrazite po gostu : ";
  obsImeTimaUtakmice:Observable<any>;
  obsImeDomacinaUtakmice:Observable<any>;
  obsImeGostaUtakmice:Observable<any>;
  obsImeTima:Observable<any>;
  obsImeDomacina:Observable<any>;
  obsImeGosta:Observable<any>;
  utakmiceSaNajviseGolova:Object[];
  rezultatPretrage:Object[];
  modPretrage:string="";
  constructor(private location:Location,private timService:TimoviService,private utakmicaService:UtakmicaService) { }

  ngOnInit() {
    this.obsImeTimaUtakmice= this.timService.getAllTimovi();
    this.obsImeGostaUtakmice= this.timService.getAllTimovi();
    this.obsImeDomacinaUtakmice = this.timService.getAllTimovi();
    this.utakmicaService.getGoloviUtakmice().subscribe((data)=>{
      this.utakmiceSaNajviseGolova=data.data.Utakmica;
    });
  }
  goBack(){
    this.location.back();
  }
  pretraziUtakmiceTima($tim){
    this.rezultatPretrage=[];
    this.modPretrage=" po nazivu tima : ";
    this.obsImeTima=this.timService.getAllUtakmice($tim);
    this.obsImeTima.subscribe((data)=>{
      console.log(data.data.Tim);
    });
  }
  pretraziUtakmiceDomacina($tim){
    this.rezultatPretrage=[];
    this.modPretrage=" po nazivu domacina : ";
    this.obsImeDomacina=this.timService.getAllHomeUtakmice($tim);
    this.obsImeDomacina.subscribe((data)=>{
      let pomNiz=data.data.Tim[0].utakmica;
      pomNiz.forEach(element => {
        this.rezultatPretrage.push(element.Utakmica);
      });
    });
  }
  pretraziUtakmiceGosta($tim){
    this.rezultatPretrage=[];
    this.modPretrage=" po nazivu gosta : ";
    this.obsImeGosta=this.timService.getAllAwayUtakmice($tim);
    this.obsImeGosta.subscribe((data)=>{
      console.log(data)
    });
  }
}
