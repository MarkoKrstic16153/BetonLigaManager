import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'apollo-link';

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
  constructor(private location:Location) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
