import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'apollo-link';

@Component({
  selector: 'app-pretragatim',
  templateUrl: './pretragatim.component.html',
  styleUrls: ['./pretragatim.component.css']
})
export class PretragatimComponent implements OnInit {
  pretragaPoImenu:string="Pretrazite po imenu tima : ";
  modImeTima:string="imetima";
  obsImeTima:Observable<any>;
  constructor(private location:Location) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
