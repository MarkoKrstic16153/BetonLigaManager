import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UtakmicaService } from 'src/services/UtakmicaService';
import { TimoviService } from 'src/services/TimoviService';
import { Utakmica } from 'src/models/Utakmica';
import { Strelac } from 'src/models/Strelac';
import { Igrac } from 'src/models/Igrac';

@Component({
  selector: 'app-utakmica',
  templateUrl: './utakmica.component.html',
  styleUrls: ['./utakmica.component.css']
})
export class UtakmicaComponent implements OnInit {

  loadingUtakmica:boolean=true;
  loadingRezulatat:boolean=true;
  loadingStrelci:boolean=true;
  loadingDomaciSastav:boolean=true;
  loadingGostujuciSastav:boolean=true;
  utakmica:Utakmica;
  domacin;
  gost;
  golovi:Array<Object>;
  strelci:Array<Strelac>;
  ishodUtakmice:String;
  domaciSastav:Array<Igrac>=[];
  gostujuciSastav:Array<Igrac>=[];
  constructor(private location:Location,private active:ActivatedRoute,private utakmicaService:UtakmicaService,private timService:TimoviService) { }

  ngOnInit() {
    this.active.params.subscribe(params=>{
      this.utakmicaService.getUtakmica(params.datum,params.vreme).subscribe(({data,loading})=>{
        this.loadingUtakmica=loading;
        this.utakmica=data.Utakmica[0];
      });

      this.utakmicaService.getGoloviUtakmice(params.datum,params.vreme).subscribe(({data,loading})=>{
        this.loadingStrelci=loading;
        this.strelci=data.Utakmica[0].golovi;
        this.strelci=this.strelci.sort(function (item1,item2){
          return +item1.vreme-(+item2.vreme);
        })
      });

      this.utakmicaService.getBrGolovaDomGost(params.datum,params.vreme).subscribe(({data,loading})=>{
        this.loadingRezulatat=loading;
        this.domacin=data.Utakmica[0].timovi[1];
        this.gost=data.Utakmica[0].timovi[0];
        if(this.domacin.golovi>this.gost.golovi)
          this.ishodUtakmice="Pobeda"
          else if(this.domacin.golovi==this.gost.golovi)
            this.ishodUtakmice="Nereseno"
            else
            this.ishodUtakmice="Poraz"
      });
      
      this.utakmicaService.getSastavDomacin(params.datum,params.vreme).subscribe(({data,loading})=>{
        this.loadingDomaciSastav=loading;
        data.Utakmica[0].timovi[0].Tim.igraci.forEach(element => {
          this.domaciSastav.push(element.Igrac);
        });
        this.domaciSastav.sort(function (igrac1,igrac2){
          return +igrac1.brojDresa-(+igrac2.brojDresa);
        });
      });
      
      this.utakmicaService.getSastavGost(params.datum,params.vreme).subscribe(({data,loading})=>{
        this.loadingGostujuciSastav=loading;
        data.Utakmica[0].timovi[0].Tim.igraci.forEach(element => {
          this.gostujuciSastav.push(element.Igrac);
        });
        this.gostujuciSastav.sort(function (igrac1,igrac2){
          return +igrac1.brojDresa-(+igrac2.brojDresa);
        });
      });
    })
  }
  goBack(){
    this.location.back();
  }

}
