import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stadion',
  templateUrl: './stadion.component.html',
  styleUrls: ['./stadion.component.css']
})
export class StadionComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
