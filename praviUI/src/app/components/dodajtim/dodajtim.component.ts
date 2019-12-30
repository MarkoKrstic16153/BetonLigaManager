import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TimoviService } from 'src/services/TimoviService';
import { Tim } from 'src/models/Tim';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dodajtim',
  templateUrl: './dodajtim.component.html',
  styleUrls: ['./dodajtim.component.css']
})
export class DodajtimComponent implements OnInit {
  
  nazivControl:FormControl=new FormControl('',Validators.required);
  opisControl:FormControl=new FormControl('',Validators.required);
  constructor(private timService:TimoviService,private location:Location) { }

  ngOnInit() {
    
  }

  dodajTim(){
    let noviTim : Tim = {opis:this.opisControl.value,naziv:this.nazivControl.value,brojPobeda :0,brojPoenaTabela:0,brojPoraza:0,nereseno:0,postignutiGolovi:0,primljeniGolovi:0};
    console.log(noviTim);
    this.timService.createTim(noviTim);
  }

  goBack(){
    this.location.back();
  }

}
