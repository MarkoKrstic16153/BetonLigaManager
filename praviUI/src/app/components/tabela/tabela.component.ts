import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TimoviService } from 'src/services/TimoviService';
import { Tim } from 'src/models/Tim';
import { LigaService } from 'src/services/LigaService';
import { Liga } from 'src/models/Liga';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  timovi:Tim[];
  loading:boolean=true;
  lige:Liga[]=[];
  lig:string="";
  ligaControl: FormControl = new FormControl("",Validators.required);
  
  constructor(private location:Location,private timoviService:TimoviService,private ligaService:LigaService) { }

  ngOnInit() {
    this.ligaService.getAllLiga().subscribe(({data})=>this.lige=data.Liga);
  }

  promenjenSelect(){
      this.lig="Ligi";
      this.timoviService.getSortTimoviLiga(this.ligaControl.value).subscribe(({data,loading})=>{
      this.timovi=data.Tim as Tim[];
      this.loading=loading;
    })
  }

  goBack(){
    this.location.back();
  }
}
