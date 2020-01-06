import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Igrac } from 'src/models/Igrac';
import { IgracService } from 'src/services/IgracService';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {

  igrac;
  loadingIgrac:boolean=true;
  loadingByPostion:boolean=true;
  loadingByNumber:boolean=true;
  loadingSaigraci:boolean=true;
  poPoziciji:Igrac[];
  poBrojDresa:Igrac[];
  saigraci:any[]=[];
  constructor(private location:Location,private active:ActivatedRoute,private igracService:IgracService) { }

  ngOnInit() {
    this.active.params.subscribe(params=>{
      this.igracService.getIgrac(params.id).subscribe(({data,loading})=>{
        this.loadingIgrac=loading;
        this.igrac=data.Igrac[0];
        //povlaci sve saigrace iz tima
        this.igracService.getIgraciTim(this.igrac.tim[0].Tim.naziv).subscribe(({data,loading})=>{
          this.loadingSaigraci=loading;
            this.saigraci=data.Tim[0].igraci.filter(x=>x.Igrac.brojTelefona!=this.igrac.brojTelefona);
        });

        //povlaci 5 igraca sa istom pozicijom bez igraca koji se prikazuje trenutno
        this.igracService.getIgracByPosition(this.igrac.pozicija,this.igrac.brojTelefona).subscribe(({data,loading})=>{
          this.loadingByPostion=loading;
          this.poPoziciji=data.Igrac.slice(0,5);
        });
        //povlaci 5 igraca sa istim brojem bez igraca koji se prikazuje trenutno
        this.igracService.getIgracByNumber(this.igrac.brojDresa,this.igrac.brojTelefona).subscribe(({data,loading})=>{
          this.loadingByNumber=loading;
          this.poBrojDresa=data.Igrac.slice(0,5);
        });        
      })
    })
  }
  izbaci(p){
    if(p)
    this.saigraci.splice(p,1);
  }
  goBack(){
    this.location.back();
  }
}
