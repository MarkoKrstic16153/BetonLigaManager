import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-utakmica',
  templateUrl: './utakmica.component.html',
  styleUrls: ['./utakmica.component.css']
})
export class UtakmicaComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
