import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pretragastadion',
  templateUrl: './pretragastadion.component.html',
  styleUrls: ['./pretragastadion.component.css']
})
export class PretragastadionComponent implements OnInit {
  pretragaPoImenu:string="Pretrazite po imenu stadiona : ";
  modImeStadiona:string="imestadiona";
  pretragaPoTimu:string="Pretrazite po timu kome pripada stadiona : ";
  modImeTima:string="imetimstadiona";
  obsImeStadiona:Observable<any>;
  obsImeTimStadiona:Observable<any>;
  constructor(private location:Location) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
