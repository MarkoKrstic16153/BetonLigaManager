import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TimoviService } from 'src/services/TimoviService';
import { Tim } from 'src/models/Tim';

@Component({
  selector: 'app-dodajtim',
  templateUrl: './dodajtim.component.html',
  styleUrls: ['./dodajtim.component.css']
})
export class DodajtimComponent implements OnInit {
  
  nazivControl:FormControl=new FormControl('',Validators.required);
  opisControl:FormControl=new FormControl('',Validators.required);
  constructor(private timService:TimoviService) { }

  ngOnInit() {
    
  }

  dodajTim(){
    let noviTim : Tim = {opis:this.opisControl.value,naziv:this.nazivControl.value};
    console.log(noviTim);
    this.timService.postTim(noviTim);
  }

}
