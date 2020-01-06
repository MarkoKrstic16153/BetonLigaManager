import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { TimoviService } from 'src/services/TimoviService';
import { StadionService } from 'src/services/StadionService';
import { FormControl } from '@angular/forms';
import { startWith, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pretragastadion',
  templateUrl: './pretragastadion.component.html',
  styleUrls: ['./pretragastadion.component.css']
})
export class PretragastadionComponent implements OnInit {
  pretragaPoTimu:string="Pretrazite po timu kome pripada stadiona : ";
  obsImeStadiona:Observable<any>;
  obsImeTimStadiona:Observable<any>;
  imeControl = new FormControl();
  najviseUtakmica:Object[];
  najviseKapaciteta:Object[];
  rezultatPretrage:Object[];
  constructor(private location:Location,private timService:TimoviService,private stadionService:StadionService,private router:Router) { }

  ngOnInit() {
    this.obsImeTimStadiona=this.timService.getAllTimovi();
    this.imeControl.valueChanges
    .pipe(
      filter(podatak => podatak.length>2)
    ).subscribe((pocetakStadiona)=>{
      console.log(pocetakStadiona);
      this.stadionService.getStadionStartsWith(pocetakStadiona.charAt(0).toUpperCase() + pocetakStadiona.slice(1)).subscribe((data)=>{
        console.log(data.data.Stadion);
        this.rezultatPretrage=data.data.Stadion;
      });
    });
    this.stadionService.topKapacitet().subscribe((data)=>{
      this.najviseKapaciteta = data.data.Stadion;
    });
    this.stadionService.getStadionUtakmice().subscribe((data)=>{
      this.najviseUtakmica= data.data.Stadion;
    });
  }
  goBack(){
    this.location.back();
  }

  pretragaStadiona($tim){
    this.stadionService.getTimStadion($tim).subscribe(({data,loading})=>{
      this.router.navigate(['/pretrazistadione/stadion/', data.Tim[0].stadion[0].Stadion.naziv]);
    });
  }
}
