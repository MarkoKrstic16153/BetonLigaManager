import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LigaService } from 'src/services/LigaService';
import { Liga } from 'src/models/Liga';

@Component({
  selector: 'app-dodajligu',
  templateUrl: './dodajligu.component.html',
  styleUrls: ['./dodajligu.component.css']
})
export class DodajliguComponent implements OnInit {
  nazivControl: FormControl = new FormControl("", Validators.required);
  opisControl: FormControl = new FormControl("", Validators.required);
  constructor(private router:Router, private location:Location,private ligaService:LigaService) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

  dodajLigu(){
    let novaLiga : Liga = {opis:this.opisControl.value,naziv:this.nazivControl.value};
    this.ligaService.addLiga(novaLiga).subscribe(()=>{this.router.navigate(["/admin"]);});
  }

}
