import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TimoviService } from 'src/services/TimoviService';
import { ActivatedRoute } from '@angular/router';
import { Tim } from 'src/models/Tim';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit {

  tim:Tim;
  loadingTim:boolean=true;
  loadingSlicni:boolean=true;
  trenutnaPozicijaNaTabli:number;
  slicniTimovi:Tim[];
  constructor(private location:Location,private timoviService:TimoviService,private active:ActivatedRoute) { }

  ngOnInit() {
    this.active.params.subscribe(params=>{
      this.timoviService.getTim(params.nazivTima).subscribe(({data,loading})=>{
        this.loadingTim=loading;
        this.tim=data.Tim[0];
        this.timoviService.getSortTimovi().subscribe(({data,loading})=>{
          this.loadingSlicni=loading;
          let x:Array<Tim>=data.Tim;
          this.slicniTimovi=[];
          this.trenutnaPozicijaNaTabli=x.findIndex((item)=>item.naziv==this.tim.naziv);
          if(this.trenutnaPozicijaNaTabli==0){
            this.slicniTimovi.push(x[1]);
            this.slicniTimovi.push(x[2]);
          }
          else{
            this.slicniTimovi.push(x[this.trenutnaPozicijaNaTabli-1]);
            if(this.trenutnaPozicijaNaTabli+1!=x.length)
            this.slicniTimovi.push(x[this.trenutnaPozicijaNaTabli+1]);
          }
        });
      })
    });
  }
  goBack(){
    this.location.back();
  }

}
