import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TimoviService } from 'src/services/TimoviService';
import { StadionService } from 'src/services/StadionService';
import { Stadion } from 'src/models/Stadion';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dodajstadion',
  templateUrl: './dodajstadion.component.html',
  styleUrls: ['./dodajstadion.component.css']
})
export class DodajstadionComponent implements OnInit {

  timovi:any[]=[];
  adresaControl:FormControl=new FormControl('',Validators.required);
  kapacitetControl:FormControl=new FormControl('',Validators.required);
  nazivControl:FormControl=new FormControl('',Validators.required);
  opisControl:FormControl=new FormControl('',Validators.required);
  timControl:FormControl=new FormControl('',Validators.required);

  constructor(private timService:TimoviService,private stadionService:StadionService,private location:Location) { }

  ngOnInit() {
    this.timService.getAllTimovi().subscribe((podaci)=>{this.timovi=podaci.data.Tim;console.log(this.timovi)});
  }

  dodajStadion(){
    let noviStadion:Stadion = {adresa:this.adresaControl.value,kapacitet:this.kapacitetControl.value,naziv:this.nazivControl.value,opis:this.opisControl.value};
    console.log(noviStadion);
    console.log(this.timControl.value);
    this.stadionService.createStadion(noviStadion);
    this.stadionService.addStadionTim(this.timControl.value,noviStadion.naziv);
  }

  goBack(){
    this.location.back();
  }

}
