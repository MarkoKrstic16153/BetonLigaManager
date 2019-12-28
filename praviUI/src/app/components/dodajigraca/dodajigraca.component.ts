import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import gql from 'graphql-tag';
import { QueryRef, Apollo } from 'apollo-angular';
import { TimoviService } from 'src/app/services/TimoviService';
import { IgracComponent } from '../igrac/igrac.component';
import { Igrac } from 'src/app/models/Igrac';
import { IgracService } from 'src/app/services/IgracService';

@Component({
  selector: 'app-dodajigraca',
  templateUrl: './dodajigraca.component.html',
  styleUrls: ['./dodajigraca.component.css']
})
export class DodajigracaComponent implements OnInit {
  
  
  timovi:any[]=[];
  pozicije:string[]=["Odbrana","Napad","Golman","Rezarva"];
  imeControl:FormControl=new FormControl('',Validators.required);
  prezimeControl:FormControl=new FormControl('',Validators.required);
  brojDresaControl:FormControl=new FormControl('',Validators.required);
  godRodjenjaControl:FormControl=new FormControl('',Validators.required);
  brojTelefonaControl:FormControl=new FormControl('',Validators.required);
  opisControl:FormControl=new FormControl('',Validators.required);
  pozicijaControl:FormControl=new FormControl('',Validators.required);
  timControl:FormControl=new FormControl('',Validators.required);

  constructor(private timService:TimoviService,private igracService:IgracService){
  }

  ngOnInit() {
    this.timService.getAllTimovi().subscribe((podaci)=>{this.timovi=podaci.data.Tim;console.log(this.timovi)});
  }
  dodajIgraca(){
    let noviIgrac : Igrac = {
      ime:this.imeControl.value,
      brojDresa:this.brojDresaControl.value,
      brojTelefona:this.brojTelefonaControl.value,
      godRodjenja:this.godRodjenjaControl.value,
      opis:this.opisControl.value,
      pozicija:this.pozicijaControl.value,
      prezime:this.prezimeControl.value
      };
      console.log(noviIgrac);
      console.log(this.timControl.value);
       this.igracService.addIgrac(noviIgrac,this.timControl.value).subscribe((data)=>{
         console.log(data);
       });
  }

}
