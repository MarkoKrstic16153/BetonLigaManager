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
  modImeTima:string="imetimautakmice";
  pretragaPoImenuDomacina:string="Pretrazite po domacinu : ";
  modImeTimaDomaci:string="imedomacinautakmice";
  pretragaPoImenuGosta:string="Pretrazite po gostu : ";
  modImeTimaGosti:string="imegostautakmice";
  obsImeTimaUtakmice:Observable<any>;
  obsImeDomacinaUtakmice:Observable<any>;
  obsImeGostaUtakmice:Observable<any>;
  utakmiceSaNajviseGolova:Object[];
  rezultatPretrage:Object[];
  gost:string="";
  domacin:string="";
  modPretrage:string="";
  constructor(private location:Location,private timService:TimoviService,private utakmicaService:UtakmicaService) { }

  ngOnInit() {
    this.obsImeTimaUtakmice=this.obsImeGostaUtakmice=this.obsImeDomacinaUtakmice = this.timService.getAllTimovi();
    this.utakmicaService.getGoloviUtakmice().subscribe((data)=>{
      this.utakmiceSaNajviseGolova=data.data.Utakmica;
    });
  }
  goBack(){
    this.location.back();
  }
  pretraziUtakmiceTima($tim){
    console.log($tim);
    this.modPretrage=" po nazivu tima : ";
  }
  pretraziUtakmiceGosta($tim){
    this.gost=$tim;
    this.modPretrage=" po nazivu gosta : ";
  }
  pretraziUtakmiceDomacina($tim){
    this.domacin=$tim;
    this.modPretrage=" po nazivu domacina : ";
  }
  duplaPretraga(){
    if(this.domacin!="" && this.gost!="" && this.domacin!=this.gost)
    {
      console.log('moze pretraga');
      this.modPretrage=" po nazivu domacina i gosta : ";
    }
  }
}
