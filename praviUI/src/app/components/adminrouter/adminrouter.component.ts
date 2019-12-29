import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminrouter',
  templateUrl: './adminrouter.component.html',
  styleUrls: ['./adminrouter.component.css']
})
export class AdminrouterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
}
