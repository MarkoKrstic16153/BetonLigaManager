import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }
  
  goBack(){
    this.location.back();
  }
}
