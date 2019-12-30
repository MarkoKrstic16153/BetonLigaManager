import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { IgracService } from 'src/services/IgracService';
import { TimoviService } from 'src/services/TimoviService';

@Component({
  selector: 'app-pretragaigrac',
  templateUrl: './pretragaigrac.component.html',
  styleUrls: ['./pretragaigrac.component.css']
})
export class PretragaigracComponent implements OnInit {
  pretragaPoImenu:string="Pretrazite po imenu :";
  pretragaPoDresu:string="Pretrazite po broju dresa :";
  pretragaPoTimu:string="Pretrazite po timu :";
  pretragaPoPoziciji:string="Pretrazite po poziciji :";
  modImeIgraca:string="imeigraca";
  modBrojDresaIgraca:string="brojdresaigraca";
  modTimIgraca:string="timigraca";
  modPozicijaIgraca:string="pozicijaigraca";
  obsImeIgraca:Observable<any>;
  obsBrojDresaIgraca:Observable<any>;
  obsTimIgraca:Observable<any>;
  obsPozicijaIgraca:Observable<any>;
  constructor(private location:Location,private igracService:IgracService,private timService:TimoviService) { }

  ngOnInit() {
    this.obsTimIgraca=this.timService.getAllTimovi();
  }
  goBack(){
    this.location.back();
  }

}
