import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }
  goBack(){
    this.location.back();
  }

}
