import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TimoviService } from 'src/services/TimoviService';
import { Tim } from 'src/models/Tim';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {

  timovi:Tim[];
  loading:boolean=true;
  constructor(private location:Location,private timoviService:TimoviService) { }

  ngOnInit() {
    this.timoviService.getSortTimovi().subscribe(({data,loading})=>{
      console.log(data);
      
      this.timovi=data.Tim as Tim[];
      this.loading=loading;
    })
  }
  goBack(){
    this.location.back();
  }

}
